import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

// const featureList: FeatureProps[] = [
//   {
//     title: "Highlight key changes",
//     description: "We look through your changes and highlight the key changes.",
//   },
//   {
//     title: "Speed up the review process",
//     description: "Without lifting a finger, we put your PR up for review.",
//   },
//   {
//     title: "Customized to your team",
//     description:
//       "We look at examples to ensure we are following the guidelines.",
//   },
// ];

const featureList: FeaturesProps[] = [
  {
    icon: "Highlighter",
    title: "Highlight key changes",
    description: "We look through your changes and highlight the key changes.",
  },
  {
    icon: "BadgeCheck",
    title: "Speed up the review process",
    description:
      "Without lifting a finger, we put your pull request up for review.",
  },
  {
    icon: "Palette",
    title: "Customized to your team",
    description:
      "We look at examples to ensure we are following the guidelines.",
  },
];

export const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="container py-2 sm:py-32 flex flex-col space-y-8"
    >
      <div>
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Features
        </h2>

        <h2 className="text-2xl md:text-4xl text-center font-bold mb-4">
          What does Just Push even do?
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle className="text-center">{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center max-w-[19rem] mx-auto">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
