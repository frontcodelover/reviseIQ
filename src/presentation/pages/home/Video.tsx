import { AspectRatio } from '@/presentation/components/ui/aspect-ratio';
import { Card, CardContent } from '@/presentation/components/ui/card';

export function Video() {
  return (
    <div className="mx-auto w-full">
      <div className="container mx-auto">
        <h2 className="font-regular mb-10 text-3xl tracking-tighter md:text-5xl lg:max-w-xl">
          Révisez de manière ludique grâce à ReviseIQ.
        </h2>
        <Card className="overflow-hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardContent className="p-0">
            <AspectRatio ratio={16 / 9}>
              <video
                className="h-full w-full rounded-lg object-contain"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
              >
                <source
                  src="https://zqiuulnsqmqcpdbjhgre.supabase.co/storage/v1/object/public/asset//reviseiq-video.mp4"
                  type="video/mp4"
                />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </AspectRatio>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
