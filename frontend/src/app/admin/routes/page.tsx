import { Card, CardContent } from "@/components/ui/card";

export default function Route() {
  return (
    <div className="container py-8 m-auto">
      <Card>
        <CardContent>
          <div className="aspect-video w-full overflow-hidden rounded-md border bg-muted">
            <iframe src="/flask/itineraire" width="100%" height="100%" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
