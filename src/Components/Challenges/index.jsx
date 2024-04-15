/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Typography, Breadcrumb, Card, Button, Modal, Pagination, Row, Col } from "antd";
import api from "../../api";

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
            topicId
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
      "easy": "Dễ",
      "medium": "Vừa",
      "hard": "Khó",
    };
    const pointMap = {
      "point": "Điểm",
    };
    return type === 'level' ? levelMap[value] || value : pointMap[value] || value;
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
          <Col key={challenge._id} xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              style={{ width: "100%" }}
              hoverable
              cover={
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img
                    alt="challenge"
                    src={challenge.imageUrl || "https://png.pngtree.com/thumb_back/fw800/background/20230903/pngtree-a-puzzle-board-with-flags-set-up-image_13191520.jpg"}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              }
            >
              <Card.Meta
                title={challenge.challengeName}
                description={
                  <>
                    <Typography.Text>{`Mức độ: ${convertToVietnamese(challenge.level, 'level')}`}</Typography.Text>
                    <Typography.Text>{`Điểm: ${convertToVietnamese(challenge.point, 'point')}`}</Typography.Text>
                    <Button style={{ marginTop: "20px", width: "100%" }} onClick={() => handleShowDetail(challenge)}>
                      Thử thách
                    </Button>
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
        title={selectedChallenge?.challengeName}
        visible={!!selectedChallenge}
        onCancel={handleCloseDetail}
        footer={null}
      >
        <p>{convertToVietnamese(selectedChallenge?.level, 'level')}</p>
        <p>{convertToVietnamese(selectedChallenge?.point, 'point')}</p>
        <Button>
          <Link to={`/questions?challengeId=${selectedChallenge?._id}`} style={{ color: "inherit", textDecoration: "none" }}>
            Chơi Ngay
          </Link>
        </Button>
      </Modal>
    </div>
  );
};

export default Challenges;