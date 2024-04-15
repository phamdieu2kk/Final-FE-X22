/*eslint-disable*/
import { useEffect, useState } from "react";
import { Row, Col, Card, Pagination, Typography } from "antd"; // Import Button component from antd
import api from "../../api";
import { Link } from "react-router-dom";

const TopicSlider = () => {
  const [topics, setTopics] = useState({ list: [], total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const pageSize = 4;

  const fetchTopics = async () => {
    try {
      const response = await api.topic.invoke({
        queries: {
          page: currentPage,
          pageSize,
        },
      });
      setTopics({
        list: response.data.topics,
        total: response.data.total,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi khi tìm chủ đề:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setIsLoading(true);
    setCurrentPage(page);
  };

  return (
    <>
      <div
        className="slider-container"
        style={{
          margin: "2rem 0",
          backgroundColor: "#b44445",
          padding: "2rem",
          borderRadius: "10px",
        }}
      >
        <h1
          style={{
            color: "#f5d612",
            textAlign: "center",
            marginBottom: "2rem",
          }}
          className="home-title"
        >
          Chủ đề nổi bật
        </h1>
        <section className="topic-list">
          <Row gutter={[16, 16]}>
            {isLoading ? (
              <p>Không có dữ liệu để hiển thị.</p>
            ) : (
              topics.list.map((topic) => (
                <Col key={topic._id} xs={24} sm={12} md={8} lg={6} xl={6}>
                  <Card
                    title={topic.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                    hoverable
                    cover={
                      <img
                        style={{
                          width: "100%",
                          height: "200px",
                          overflow: "hidden",
                          objectFit: "cover",
                        }}
                        alt="topic-img"
                        src={
                          topic.imageUrl
                            ? topic.imageUrl
                            : "https://2.bp.blogspot.com/-G3nYpK1Gnlw/VI2BDS9g38I/AAAAAAAAiKk/DTPhZEDuKPM/s1600/cau-do-dan-gian.jpg"
                        }
                      />
                    }
                  >
                    <Typography.Text className="topic-title">
                      <Link
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "#b44445",
                          textDecoration: "none",
                        }}
                        to={`/challenge?topicId=${topic._id}`}
                      >
                        {topic.topicName}
                      </Link>
                    </Typography.Text>
                    <div className="topic-detail">
                      <p style={{ fontStyle: "italic" }}>
                        Miêu tả sơ lượt: {topic.description}
                      </p>
                    </div>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </section>

        {/* Hiển thị nút phân trang */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Pagination
            total={topics.total} // Tổng số mục
            pageSize={pageSize} // Kích thước trang
            current={currentPage} // Trang hiện tại
            onChange={handlePageChange} // Xử lý khi chuyển trang
          />
        </div>
      </div>
    </>
  );
};

export default TopicSlider;
