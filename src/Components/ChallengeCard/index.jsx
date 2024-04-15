/*eslint-disable*/
import React from "react";
import { Card, Button, Typography, Flex } from "antd";

const ChallengeCard = (props) => {
  const { challenge, handleShowDetail } = props;

  const convertToVietnamese = (value, type) => {
    if (type === "level") {
      switch (value) {
        case "easy":
          return "Dễ";
        case "medium":
          return "Vừa";
        case "hard":
          return "Khó";
        default:
          return value;
      }
    } else if (type === "point") {
      return value === "point" ? "Điểm" : value;
    }
  };

  return (
    <Card
      style={{ width: "100%", height: "100%", position: "relative" }}
      hoverable
      cover={
        <img
          alt="challenge"
          src={
            challenge.imageUrl ??
            "https://png.pngtree.com/thumb_back/fw800/background/20230903/pngtree-a-puzzle-board-with-flags-set-up-image_13191520.jpg"
          }
          style={{ width: "100%", height: "100px", objectFit: "cover" }}
        />
      }
    >
      <Card.Meta
        title={challenge.challengeName}
        description={
          <>
            <Flex justify="space-between" vertical>
              <Typography.Text>{`Mức độ: : ${convertToVietnamese(
                challenge.level,
                "level"
              )}`}</Typography.Text>
              <Typography.Text>{`Điểm : ${convertToVietnamese(
                challenge.point,
                "point"
              )}`}</Typography.Text>

              <Button
                style={{ marginTop: "20px", width: "100%" }}
                onClick={() => handleShowDetail(challenge)}
              >
                Thử thách
              </Button>
            </Flex>
          </>
        }
      />
    </Card>
  );
};

export default ChallengeCard;
