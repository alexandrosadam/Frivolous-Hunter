/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { Modal, Box, Typography } from "@mui/material";
import { LevelOfQuestion } from "./ResultScreen";
import { modalContainer } from "./styles";

type DetailsModalProps = {
  details_answers: LevelOfQuestion;
  total_score: number;
  isOpen: boolean;
  onClose: () => void;
};
const boxContainer = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 265,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DetailsModal: FC<DetailsModalProps> = ({
  details_answers,
  total_score,
  isOpen,
  onClose,
}) => {
  const { easy, medium, hard } = details_answers;

  return (
    <div css={modalContainer}>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxContainer}>
          <Typography variant="h6" component="h2" className="modal-title">
            Correct answers:
          </Typography>
          <Typography sx={{ mt: 2 }} className="details-container">
            {easy} easy x 15 points <br />
            {medium} medium x 18 points <br />
            {hard} hard x 25 points <br />
            <span>Total: {total_score}</span>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailsModal;
