//! need to implement logic to handle the form submission
import { Avatar, AvatarFallback, AvatarImage } from '@/presentation/components/ui/avatar';
import { Button } from '@/presentation/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/presentation/components/ui/card';
import { Input } from '@/presentation/components/ui/input';
import { Label } from '@/presentation/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/ui/select';
import { Separator } from '@/presentation/components/ui/separator';
import { Clock, Mail, Pencil } from 'lucide-react';

export function Profile() {
  return (
    <div className="flex w-full max-w-7xl p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
          <CardDescription>
            Personnalisez comment vos informations apparaîtront sur votre profil.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-6">
          {/* Version Desktop */}
          <div className="my-4 hidden gap-6 md:flex">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label>Nom</Label>
                <div className="flex gap-4">
                  <Input placeholder="Prénom" />
                  <Input placeholder="Nom" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/3 space-y-2">
                  <Label>Rôle</Label>
                  <Input defaultValue="Développeur UI" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="email" className="pl-10" defaultValue="contact@example.com" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Fuseau horaire</Label>
                <Select defaultValue="1">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionnez un fuseau horaire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Europe/Paris (GMT+01:00)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="2">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>America/New_York (GMT-05:00)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Version Mobile */}
          <div className="space-y-4 md:hidden">
            {/* ... Version mobile similaire avec classes adaptées ... */}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 pt-6">
          <Button variant="outline">Annuler</Button>
          <Button>Sauvegarder</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
