import React, { memo, useRef, useEffect, useState } from "react";
import { voteOptions } from "ultils/contants";
import { AiFillStar } from "react-icons/ai";
import { Button } from "components";

const VoteOption = ({ nameProduct, handleSubmitVoteOption }) => {
  const modalRef = useRef();
  const [chosenScore, setChosenScore] = useState(null);
  const [comment, setComment] = useState("");
  const [score, setScore] = useState(null);

  useEffect(() => {
    modalRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {" "}
      {/* Overlay */}
      <div
        ref={modalRef}
        className="bg-white w-full max-w-[700px] p-4 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal on click
      >
        <h2 className="text-center text-medium text-lg">{`Voting product ${nameProduct}`}</h2>
        <textarea
          className="form-textarea w-full placeholder-italic placeholder-text-xs placeholder-text-gray-500 text-sm"
          placeholder="Type something"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="w-full flex flex-col gap-4 mt-4">
          <p className="text-center">Cảm nhận của bạn về sản phẩm</p>
          <div className="flex justify-center gap-4 items-center flex-wrap">
            {voteOptions.map((el) => (
              <div
                className="bg-gray-200 cursor-pointer rounded-md p-4 w-24 h-24 flex items-center justify-center flex-col gap-2"
                key={el.id}
                onClick={() => {
                  setChosenScore(el.id);
                  setScore(el.id);
                }}
              >
                {Number(chosenScore) && chosenScore >= el.id ? (
                  <AiFillStar color="orange" />
                ) : (
                  <AiFillStar color="gray" />
                )}
                <span className="text-center text-xs md:text-sm">
                  {el.text}
                </span>
              </div>
            ))}
          </div>
        </div>
        <Button
          handleOnClick={() => handleSubmitVoteOption({ comment, score })}
          fw
        >
          Gửi phản hồi
        </Button>
      </div>
    </div>
  );
};

export default memo(VoteOption);
