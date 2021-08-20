import { Modal } from "antd";

export const warning = (message: string) => {
  Modal.warning({
    title: "오류",
    content: `${message}`,
  });
};
