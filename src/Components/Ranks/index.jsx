import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";
import api from "../../api";
import "./style.css";

const Ranks = () => {
  const [rankList, setRankList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getRankList.invoke({});
        setRankList(response.data.rankList);
        setLoading(false); 
      } catch (error) {
        console.error("Lỗi khi tìm bảng xếp hạng:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(loading); 
  }, [loading]);

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
    <div className="ranks-container" style={{ paddingLeft: "20px" }}>
      <h1
        className="home-title"
        style={{
          textAlign: "center",
        }}
      >
        Bảng xếp hạng
      </h1>
      <div className="table-wrapper">
        {isLoading ? (
          <Spin size="large" />
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