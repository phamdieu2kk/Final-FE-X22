import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Pagination, Row, Col } from "antd";
import { Link } from "react-router-dom";
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
            const response = await api.getChallengeList.invoke({
                queries: {
                    page: currentPage,
                    pageSize,
                },
            });
            setChallenges(response.data.challengeList);
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
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    

    return (

        <div className="slider-container" style={{
            backgroundColor:"lightblue"
        }}>
            <h1 style={{ textAlign: "center" ,  fontFamily: "Playball"}} className="home__title">Thử thách nổi bật</h1>
            <Button>
                Left
            </Button>
            <section className="challenge-slider">
                <Row wrap={false} style ={{height:"100%"}}gutter={[16, 16]}>
                    {challenges.map((challenge) => (
                        <Col
                         key={challenge._id}
                          xs={24}
                          sm={12}
                          md={8}
                          lg={6}
                          xl={6}>
                            <ChallengeCard challenge={challenge} handleShowDetail={handleShowDetail}></ChallengeCard>
                        </Col>
                    ))}
                </Row>
            </section>
            <Button>Right</Button>
            {/* Hiển thị nút phân trang */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Pagination
                    total={challenges.total}
                    pageSize={pageSize} // Kích thước trang
                    current={currentPage} // Trang hiện tại
                    onChange={handlePageChange} // Xử lý khi chuyển trang
                />
            </div>


            <Modal
                title={selectedChallenge?.challengeName}
                visible={!!selectedChallenge}
                onCancel={handleCloseDetail}
                footer={null}
            >
                <p>{selectedChallenge?.level}</p>
                <p>{selectedChallenge?.point}</p>
                <Button>
                    <Link to={`/questions`} style={{ color: "inherit", textDecoration: "none" }}>
                        Chơi Ngay
                    </Link>
                </Button>
            </Modal>
           
        </div>
    );
};

export default ChallangeSlider;