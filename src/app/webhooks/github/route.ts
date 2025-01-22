import { NextResponse } from "next/server";
import { App, Octokit } from "octokit";
import { env } from "@/env.mjs";
import {
  handleCreate,
  handleInstall,
  handleRepoInstall,
} from "../../../lib/webhookHandlers";
import { createAppAuth } from "@octokit/auth-app";

const appId = env.APP_ID;
const privateKey = env.PRIVATE_KEY;
const secret = env.WEBHOOK_SECRET;

const octoKitApp = new App({
  appId,
  privateKey,
  webhooks: {
    secret,
  },
});

export async function POST(request: Request) {
  const event = request.headers.get("X-GitHub-Event");

  console.log("Received github event:", event);
  const payload = await request.json();

  const installationId = payload.installation.id;

  const octokit = (await octoKitApp.octokit.auth({
    type: "installation",
    installationId,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Needed for this instance
    factory(auth: any) {
      return new auth.octokit.constructor({
        ...auth.octokitOptions,
        authStrategy: createAppAuth,
        ...{
          auth: {
            ...auth,
            installationId,
          },
        },
      });
    },
  })) as Octokit;

  switch (event) {
    case "create":
      await handleCreate(payload, octokit);
      break;
    case "installation":
      await handleInstall(payload, octokit);
      break;
    case "installation_repositories":
      await handleRepoInstall(payload, octokit);
      break;
    default:
      break;
  }

  return NextResponse.json({ status: 200, statusText: "success" });
}
