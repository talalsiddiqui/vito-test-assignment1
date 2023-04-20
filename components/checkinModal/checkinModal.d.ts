export interface ICheckInModalProps {
  open: boolean;
  onSubmit: (data: any) => void;
  handleCancel: () => void;
  confirmLoading: boolean;
};