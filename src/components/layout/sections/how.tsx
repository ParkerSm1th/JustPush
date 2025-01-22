import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "Blocks",
    title: "Ingest your guides",
    description:
      "Just Push searches your repo for CONTRIBUTING.md's, pull request guides, and other files.",
  },
  {
    icon: "AlignLeft",
    title: "Generate Instructions",
    description:
      "Automatically generate instructions for your PRs based on the guidelines, editable by you, anytime.",
  },
  {
    icon: "Radio",
    title: "Wait for new branches",
    description:
      "Just Push is always waiting for new branches to be created, so we can create PRs for you.",
  },
  {
    icon: "GitPullRequestCreate",
    title: "Create a PR",
    description:
      "When a branch is created, we create a PR for you, with the title and description.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how" className="container py-24 sm:py-20 px-2">
      <div className="grid lg:grid-cols-5 place-items-center lg:gap-24">
        <div className="lg:col-span-2 text-center md:text-left pb-8 md:pb-0">
          <h2 className="text-lg text-primary mb-2 tracking-wider">
            How it works
          </h2>

          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Your shortcut to creating pull requests
          </h2>
        </div>

        <div className="grid lg:col-span-3 lg:grid-cols-2 gap-4 w-full px-8 md:mx-0">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
