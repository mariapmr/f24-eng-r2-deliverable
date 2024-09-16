"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import { useState } from "react";
import EditSpeciesDialog from "./edit-species-dialog";
// import sessionId from "./page";
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function DisplaySpeciesDialog({ dispSpecies }: { dispSpecies: Species }) {
  // Control open/closed state of the dialog
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-3 w-full">Learn More</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{dispSpecies.scientific_name}</DialogTitle>
          <DialogDescription>{dispSpecies.common_name}</DialogDescription>
        </DialogHeader>
        {dispSpecies.image && (
          <div className="relative h-40 w-full">
            <Image src={dispSpecies.image} alt={dispSpecies.scientific_name} fill style={{ objectFit: "contain" }} />
          </div>
        )}
        <p>Total population: {dispSpecies.total_population}</p>
        <p>Kingdom: {dispSpecies.kingdom}</p>
        <p>Description: {dispSpecies.description}</p>

        {/* if(sessionId == dispSpecies.author) {
          <EditSpeciesDialog />
        } */}
        <EditSpeciesDialog speciesEdit={dispSpecies} />
        <DialogClose asChild>
          <Button type="button" className="ml-1 mr-1 flex-auto" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
