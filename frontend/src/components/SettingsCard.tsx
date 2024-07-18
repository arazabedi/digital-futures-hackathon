import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

interface SettingsCardProps {
  title: string;
  description: string;
  buttonOnClick: () => void;
  buttonVariant:
    | "link"
    | "default"
    | "destructive"
    | "secondary"
    | "outline"
    | "ghost"
    | null
    | undefined;
  buttonText: string;
}

export default function SettingsCard(props: SettingsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardFooter className="border-t px-6 py-4">
        <Button onClick={props.buttonOnClick} variant={props.buttonVariant}>
          {props.buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
