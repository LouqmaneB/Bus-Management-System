import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function Stop() {
  return (
    <div className="container py-8 m-auto">
    <Card>
      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-md border bg-muted">
          <iframe src="http://127.0.0.1:5000/stops" width="100%" height="100%"/>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
