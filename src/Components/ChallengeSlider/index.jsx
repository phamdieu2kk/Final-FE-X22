/*eslint-disable*/
import { useState, useEffect } from "react";
import { Button, Modal, Pagination, Row, Col ,Flex} from "antd";
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

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className="slider-container" style={{ backgroundColor: "" }}>
            <h1 style={{ textAlign: "center"}} className="home-title">Thử thách nổi bật</h1>
            <div style={{ textAlign: "right"}} >
                <Button onClick={handlePrevPage}><CaretLeftOutlined /></Button>
                <Button onClick={handleNextPage}><CaretRightOutlined /></Button>
            
            </div>
                
            <section className="challenge-slider">
                <Row wrap={false} gutter={[16, 16]}>
                    {challenges.map((challenge) => (
                        <Col key={challenge._id} xs={24} sm={12} md={8} lg={6} xl={6}>
                        <ChallengeCard challenge={challenge} handleShowDetail={handleShowDetail} />
                       </Col>
                    ))}
                </Row>
            </section>
            <Modal
            title={selectedChallenge?.challengeName}
            visible={!!selectedChallenge}
            onCancel={handleCloseDetail}
            footer={null}
            >
                <Button>
                    <Link to={`/questions?challengeId=${selectedChallenge?._id}`} style={{ color: "inherit", textDecoration: "none" }}>
                        Chơi Ngay
                        </Link>
                        </Button>
                        </Modal>
                        </div>
                        );
                    };

export default ChallangeSlider;