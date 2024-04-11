import React, { useEffect, useState } from "react";
import { Row, Col, Card, Pagination } from "antd"; // Import Button component from antd
import api from "../../api";
import { Link } from "react-router-dom";

const TopicSlider = () => {
    const [topics, setTopics] = useState({ list: [], total: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const pageSize = 4; // Kích thước trang

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
    }, [currentPage]); // Fetch dữ liệu mới khi currentPage thay đổi

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setIsLoading(true); // Reset isLoading state to true when changing pages
    };

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         handlePageChange(currentPage); // Chuyển slide qua trang kế tiếp
    //     }, 5000); // 5000 milliseconds = 5 giây
    //     return () => clearInterval(timer);
    // }, [currentPage]); // Chạy useEffect mỗi khi currentPage thay đổi

    return (
        <div className="container-page">
            <h1
                style={{
                    textAlign: "center",
                }}
                className="home__title"
            >
                Thử thách nổi bật
            </h1>
            <section className="section-danhmuc">
                <Row gutter={[16, 16]}>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        topics.list.map((topic) => (
                            <Col
                                key={topic._id}
                                xs={24}
                                sm={12}
                                md={8}
                                lg={6}
                                xl={6}
                            >
                                <Card
                                    title={topic.title}
                                    style={{ width: "90%" }}
                                >
                                    <img
                                        alt="topic-img"
                                        src={
                                            topic.image
                                                ? topic.image
                                                : "https://2.bp.blogspot.com/-G3nYpK1Gnlw/VI2BDS9g38I/AAAAAAAAiKk/DTPhZEDuKPM/s1600/cau-do-dan-gian.jpg"
                                        }
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    />
                                    <div className="topic-detail">
                                        <h3>
                                            <Link
                                                to={`/challenge?topicId=${topic._id}`}
                                            >
                                                {topic.topicName}
                                            </Link>
                                        </h3>
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
    );
};

export default TopicSlider;
