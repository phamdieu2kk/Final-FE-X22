import "./style.css";

import { Breadcrumb} from "antd";

const Ranks = () => {


  return (
    <div>
      <div className="content">
        <div className="title-home">
          <Breadcrumb
            // items={[
            //   { title: <Link to="/">Trang chủ</Link> },
            //   { title: "Tất cả chủ đề" },
            // ]}
          />
        </div>
      </div>
      <h2 className="title-instruction">
        BẢNG XẾP HẠNG
      </h2>
      {/* <div className="pt-2 text-right">
        <select className="rounded border-2 border-slate-300 px-4 py-1 outline-none">
          <option value="" selected="">
            Chọn top
          </option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div> */}
      </div>
  );
};

export default Ranks;