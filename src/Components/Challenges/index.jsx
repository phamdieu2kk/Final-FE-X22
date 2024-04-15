/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Typography,
  Breadcrumb,
  Card,
  Button,
  Modal,
  Pagination,
  Row,
  Col,
  Flex,
} from "antd";
import api from "../../api";
import ChallengeCard from "../ChallengeCard";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchChallenges = async () => {
      const topicId = searchParams.get("topicId");
      try {
        const response = await api.getChallengeList.invoke({
          queries: {
            page: currentPage,
            pageSize,
            topicId,
          },
        });
        setChallenges(response.data.challengeList);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };
    fetchChallenges();
  }, [currentPage, searchParams, pageSize]);

  const handleShowDetail = (challenge) => {
    setSelectedChallenge(challenge);
  };

  const handleCloseDetail = () => {
    setSelectedChallenge(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const convertToVietnamese = (value, type) => {
    const levelMap = {
      easy: "Dễ",
      medium: "Vừa",
      hard: "Khó",
    };
    const pointMap = {
      point: "Điểm",
    };
    return type === "level"
      ? levelMap[value] || value
      : pointMap[value] || value;
  };

  return (
    <div className="container">
      <div className="title-home">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Thử thách</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Row gutter={[16, 16]}>
        {challenges.map((challenge) => (
          <Col
            key={challenge._id}
            style={{
              minHeight: "300px",
            }}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
          >
            {/* <ChallengeCard
              challenge={challenge}
              handleShowDetail={handleShowDetail}
            /> */}
            <Card
              hoverable
              cover={
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img
                    alt="challenge"
                    src={
                      challenge.imageUrl ||
                      "https://png.pngtree.com/thumb_back/fw800/background/20230903/pngtree-a-puzzle-board-with-flags-set-up-image_13191520.jpg"
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              }
            >
              <Card.Meta
                title={challenge.challengeName}
                description={
                  <>
                    <Flex justify="space-between" vertical>
                      <Typography.Text>{`Mức độ : ${convertToVietnamese(
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
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Pagination
          total={challenges.total}
          pageSize={pageSize}
          current={currentPage}
          onChange={handlePageChange}
        />
      </div>
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

export default Challenges;
