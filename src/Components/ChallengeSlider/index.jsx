/*eslint-disable*/
import { useState, useEffect } from "react";
import { Button, Modal, Pagination, Row, Col, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons"; // Import icons
import api from "../../api";
import "./style.css";
import ChallengeCard from "../ChallengeCard";

const ChallangeSlider = () => {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const fetchChallenges = async () => {
    try {
      // const response = await api.getFeaturedCChallenges.invoke({})
      const response = await api.getMostPlayedChallenge.invoke({});
      setChallenges(response.data.mostPlayedList);
    } catch (error) {
      console.error("Lỗi khi tìm thử thách:", error);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, [currentPage, pageSize]);

  const handleShowDetail = (challenge) => {
    setSelectedChallenge(challenge);
  };

  const handleCloseDetail = () => {
    setSelectedChallenge(null);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div
      className="slider-container"
      style={{
        overflow: "hidden",
        width: "100%",
        backgroundColor: "#b44445",
        padding: "2rem",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <h1
        style={{
          color: "#f5d612",
          textAlign: "center",
        }}
        className="home-title"
      >
        Thử thách nổi bật
      </h1>
      <section className="challenge-slider">
        <Row wrap={false} gutter={[16, 16]}>
          {challenges.map((challenge) => (
            <Col
              key={challenge.challenge._id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={6}
              style={{
                minHeight: "300px",
              }}
            >
              <ChallengeCard
                challenge={challenge.challenge}
                handleShowDetail={handleShowDetail}
              />
            </Col>
          ))}
        </Row>
      </section>

      <Button
        style={{
          alignSelf: "center",
          width: "30%",
        }}
      >
        <Link
          to="/challenge"
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Xem tất cả thử thách
        </Link>
      </Button>
      <Modal
        title={
          <Typography.Text
            style={{
              fontSize: "2rem",
              color: "#b44445",
            }}
          >{`${
            selectedChallenge?.challengeName || "Tên thử thách"
          }`}</Typography.Text>
        }
        visible={!!selectedChallenge}
        onCancel={handleCloseDetail}
        footer={null}
      >
        <Flex align="left" vertical>
          <Typography.Text>{`Mức độ: ${selectedChallenge?.level}`}</Typography.Text>
          <Typography.Text>{`Điểm: ${selectedChallenge?.point}`}</Typography.Text>
          <Typography.Text>{`Mô tả: ${selectedChallenge?.description}`}</Typography.Text>
          <Button
            style={{
              alignSelf: "center",
              width: "20%",
            }}
          >
            <Link
              to={`/questions?challengeId=${selectedChallenge?._id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Chơi Ngay
            </Link>
          </Button>
        </Flex>
      </Modal>
    </div>
  );
};

export default ChallangeSlider;
