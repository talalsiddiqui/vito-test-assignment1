import { CheckInData } from "@/types/types";

export interface IDrawerProps {
  open: boolean;
  onClose: () => void;
  data: CheckInData;
}