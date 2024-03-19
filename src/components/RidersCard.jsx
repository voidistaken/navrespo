import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Outlet } from "react-router-dom";
import RidersCarousel from "../components/RidersCarousel";
import DriversCard from "../components/DriversCard";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BellIcon, CarIcon, CheckIcon, XIcon } from "lucide-react";

const RidersCard = ({
  price,
  name,
  distance,
  btw,
  date,
  img,
  className = "",
  startLocation,
  DesiredDestination,
  accept,
  id,
}) => {
  return (
    <Card className={cn(`w-[380px] ${className}`)}>
      <CardHeader>
        <CardTitle>{price} MAD</CardTitle>
        {/* <CardDescription>{Date()}</CardDescription> */}
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4  rounded-md border p-4">
          <CarIcon />
          <div className="flex-1 space-y-1 ">
            <p className="text-sm font-medium leading-none">
              {startLocation + " > " + DesiredDestination}
            </p>
            <p className="text-sm text-muted-foreground">
              {distance ? distance : "8.3 km."} Km
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <Avatar>
            <AvatarImage
              src={
                img
                  ? img
                  : "https://cdn-icons-png.freepik.com/512/14663/14663198.png"
              }
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <span className="font-bold text-gray-900">
              {name ? name : "Sara Maria"}
            </span>
            <p className="text-sm">
              {btw
                ? btw
                : ""}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <AlertDialog>
          <AlertDialogTrigger className="w-full" asChild>
            <Button className="w-full bg-green-800">
              <CheckIcon className="mr-2 h-4 w-4" /> Accept
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => accept(id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button className="w-full" variant="destructive">
          <XIcon className="mr-2 h-4 w-4" /> Decline
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RidersCard;
