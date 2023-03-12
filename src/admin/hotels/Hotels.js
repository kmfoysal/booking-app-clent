import axios from 'axios';
import React from 'react';
import { Table } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch';
import HotelModal from './HotelModal';
import UserAvator from "../../assets/images/parson5.png";

const DeleteBtn = ({ data, loading }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${data?._id}`);

      setTimeout(() => {
        window.location.reload();
      }, "2000");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      className="ms-2 btn btn-danger"
      onClick={handleDelete}
      disabled={loading}
    >
      Delete
    </button>
  );
};


const Hotels = () => {

      const { data, loading, error } = useFetch(
        "http://localhost:5000/api/hotels"
      );
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4>Hotels Table</h4>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#SL</th>
              <th>Name</th>
              <th>Title</th>
              <th>Type</th>
              <th>Address</th>
              <th>Rating</th>
              <th>Cheapest Price</th>
              <th>Total Rooms</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((hotel, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="items-center">
                    <span>{hotel?.name}</span>
                  </td>
                  <td>{hotel?.title}</td>
                  <td>{hotel?.type}</td>
                  <td>{hotel?.address ? hotel?.address : "Not Available"}</td>
                  <td>{hotel?.rating ? hotel?.rating : "Not Available"}</td>
                  <td>{hotel?.cheapestPrice}</td>
                  <td>{hotel?.rooms?.length}</td>
                  <td>
                    <HotelModal data={hotel} />
                    <DeleteBtn data={hotel} loading={loading} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
};

export default Hotels;