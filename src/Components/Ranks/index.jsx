import { useState, useEffect } from "react";
import { Table, Spin, Alert } from "antd";
import api from "../../api";
import "./style.css";

const Ranks = () => {
  const [rankList, setRankList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getRankList.invoke({});
        setRankList(response.data.rankList);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tìm bảng xếp hạng:", error);
        setError("Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Hạng",
      dataIndex: "rank",
      key: "rank",
      className: "rank-column",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      className: "name-column",
    },
    {
      title: "Điểm số",
      dataIndex: "totalPoint",
      key: "totalPoint",
      className: "totalPoint-column",
    },
  ];

  return (
    <div className="ranks-container">
      <h1 className="home-title" style={{ textAlign: "center" }}>
        Bảng xếp hạng
      </h1>
      <div className="table-wrapper">
        {error ? (
          <Alert message={error} type="error" showIcon />
        ) : loading ? (
          <Spin size="large" />
        ) : rankList.length === 0 ? (
          <p>Không có dữ liệu để hiển thị.</p>
        ) : (
          <Table
            dataSource={rankList}
            columns={columns}
            pagination={false}
            className="custom-table"
          />
        )}
      </div>
    </div>
  );
};

export default Ranks;