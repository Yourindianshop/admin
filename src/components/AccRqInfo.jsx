import React from "react";
import "../stylesheet/AccReqInfo.css";
const request = {
  requestId: 1,
  customerName: "John Doe",
  customerEmail: "john.doe@example.com",
  productId: "ABC123",
  productName: "Sample Product",
  warehouseId: "Warehouse 1",
  requestTimestamp: "2023-08-25 10:00 AM",
  status: "Pending",
  proof: "Proof Link",
};

const AccRqInfo = () => {
  return (
    <div id="par-cont">
      <div id="par-info">
        <div className="data-field">
          <div className="df-l">Request Id</div>
          <div className="df-r">{request.requestId}</div>
        </div>
        <div className="data-field">
          <div className="df-l">Customer Name</div>
          <div className="df-r">{request.customerName}</div>
        </div>

        <div className="data-field">
          <div className="df-l">Customer Email</div>
          <div className="df-r">{request.customerEmail}</div>
        </div>

        <div className="data-field">
          <div className="df-l">Product Id</div>
          <div className="df-r">{request.productId}</div>
        </div>

        <div className="data-field">
          <div className="df-l">Product Name</div>
          <div className="df-r">{request.productName}</div>
        </div>

        <div className="data-field">
          <div className="df-l">Warehouse Id</div>
          <div className="df-r">{request.warehouseId}</div>
        </div>

        <div className="data-field">
          <div className="df-l">Request Timestamp</div>
          <div className="df-r">{request.requestTimestamp}</div>
        </div>

        <div className="data-field">
          <div className="df-l">Status</div>
          <div className="df-r">{request.status}</div>
        </div>

        <div className="data-field">
          <div className="df-l">Proof</div>
          <div className="df-r df-np">
            <a
              className="btn btn-o"
              target="_blank"
              href="https://imgv2-2-f.scribdassets.com/img/document/408301571/original/aa45aa9808/1691131805?v=1"
            >
              View Proof
            </a>
          </div>
        </div>
        <div className="data-field df-o">
          <div className="df-l ">Weight</div>
          <div className="df-r df-np">
            <input type="number" placeholder="ex: 5kg" />
          </div>
        </div>
        <div className="data-field df-o">
          <div className="df-l ">Product Dimensions</div>
          <div className="df-r df-np d-flex">
            <input type="number" placeholder="Height : ex 15cm" />
            <input type="number" placeholder="Width : ex 15cm" />
            <input type="number" placeholder="Length : ex 15cm" />
          </div>
        </div>
        <div className="data-field df-o">
          <div className="df-l ">Locker Number</div>
          <div className="df-r df-np">
            <input type="number" placeholder="ex: 1245783" />
          </div>
        </div>
        <div className="data-field df-o">
          <div className="df-l ">Product Images</div>
          <div className="df-r df-np d-flex">
            <input className="btn btn-o" type="file" />
            <input className="btn btn-o" type="file" />
            <input className="btn btn-o" type="file" />
          </div>
        </div>
        {/* <div className="data-field">
        <div className="df-l">Request Id </div>
        <div className="df-r">1</div>
      </div> */}
        <div className="btns">
          <div className="btn btn-g">Approve</div>
          <div className="btn btn-r">Reject</div>
        </div>
      </div>
    </div>
  );
};

export default AccRqInfo;
