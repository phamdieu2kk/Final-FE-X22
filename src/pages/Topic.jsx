/*eslint-disable*/
import { useEffect, useState } from "react";
import { Breadcrumb, Typography, Card, Pagination, Row, Col } from "antd";
import { Link } from "react-router-dom";
import api from "../api";

const Topic = () => {
  const [topics, setTopics] = useState({ list: [], total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const pageSize = 8; // Kích thước trang
  const fetchTopics = async () => {
    try {
      const response = await api.topic.invoke({
        queries: {
          page: currentPage,
          pageSize,
        },
      });

      setTopics({ list: response.data.topics, total: response.data.total });

      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi khi tìm chủ đề:", error);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [currentPage]); // Fetch dữ liệu mới khi currentPage thay đổi

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsLoading(true); // Reset isLoading state to true when changing pages
  };

  return (
    <>
      <div className="container">
        <div className="title-home">
          <Breadcrumb
            items={[
              { title: <Link to="/">Trang chủ</Link> },
              { title: "Tất cả chủ đề" },
            ]}
          />
        </div>
        <div className="">
          <section className="section-danhmuc">
            <Row gutter={[16, 16]}>
              {isLoading ? (
                <p>Loading...</p>
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
                            fontSize: "1.8rem",
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
      </div>
    </>
  );
};

export default Topic;
