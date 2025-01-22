import { env } from "../../../env.mjs";
import { prisma } from "../../../lib/db";
import crypto from "crypto";

interface UserCreatedEvent {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  email_addresses: {
    email_address: string;
  }[];
  external_accounts: {
    provider: string;
    provider_user_id: string;
  }[];
}

const clerkSecret = env.CLERK_WEBHOOK_SIGNING;

export async function POST(req: Request) {
  const svixId = req.headers.get("svix-id") ?? "";
  const svixTimestamp = req.headers.get("svix-timestamp") ?? "";
  const svixSignature = req.headers.get("svix-signature") ?? "";

  const requestBody = await req.text();

  const secretBytes = Buffer.from(clerkSecret.split("_")[1], "base64");
  const expectedSignature = crypto
    .createHmac("sha256", secretBytes)
    .update(`${svixId}.${svixTimestamp}.${requestBody}`)
    .digest("base64");

  if (svixSignature.split(",")[1] !== expectedSignature) {
    console.log("signature mismatch");
    return new Response(null, {
      status: 401,
    });
  }

  const user: UserCreatedEvent = JSON.parse(requestBody).data;

  if (!user) {
    return new Response(null, {
      status: 401,
    });
  }

  const prismaUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  const emailAddress = user.email_addresses[0].email_address;

  if (prismaUser) {
    return new Response(null, {
      status: 200,
    });
  }

  const githubAccount = user.external_accounts.find(
    (account) => account.provider === "oauth_github"
  );

  if (!githubAccount) {
    return new Response(null, {
      status: 401,
    });
  }

  const existingPartialUser = await prisma.user.findUnique({
    where: {
      githubId: githubAccount.provider_user_id,
    },
  });

  if (existingPartialUser) {
    await prisma.user.update({
      where: {
        githubId: githubAccount.provider_user_id,
      },
      data: {
        id: user.id,
        name: user.first_name + " " + user.last_name,
        email: emailAddress,
        username: user.username!,
      },
    });
    return new Response(null, {
      status: 200,
    });
  }

  await prisma.user.create({
    data: {
      id: user.id,
      name: user.first_name + " " + user.last_name,
      email: emailAddress,
      username: user.username!,
      githubId: githubAccount.provider_user_id,
    },
  });

  return new Response(null, {
    status: 200,
  });
}
