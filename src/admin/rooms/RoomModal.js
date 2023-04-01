import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';


const RoomModal = ({ data, btnName, addRoom, reFetch }) => {

    console.log(data);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // For Create Room State
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);

//   const { data, loading, error, reFetch } = useFetch(
//     "http://localhost:5000/api/rooms"
//   );

  // For update Hotel State
  const [editData, setEditData] = useState(data);

  const handleChange = (e) => {
    const type = e.target.type;

    const name = e.target.name;

    const value = type === "file" ? e.target.files[0] : e.target.value;

    if (addRoom) {
      setInfo((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setEditData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));

    const newRoom = {
      ...info,
      roomNumbers,
    };

    try {
      await axios.post(`http://localhost:5000/api/rooms/${hotelId}`, newRoom);

      handleClose();
      reFetch();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateRoom = {
      name: editData?.name,
      title: editData?.title,
      type: editData?.type,
      city: editData?.city,
      address: editData?.address,
      rating: editData?.rating,
      cheapestPrice: editData?.cheapestPrice,
      featured: editData?.featured,
      desc: editData?.desc,
      distance: editData?.distance,
    };

    try {
      await axios.put(
        `http://localhost:5000/api/hotels/${editData?._id}`,
        updateRoom
      );

      handleClose();
      reFetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button variant={addRoom ? "primary" : "warning"} onClick={handleShow}>
        {btnName}
      </Button>

      <Modal centered size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{addRoom ? "Create" : "Edit"} Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addRoom ? handleCreate : handleUpdate}>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="name"
                  label="Room Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter hotel Name ... "
                    value={addRoom ? info?.title : editData?.title}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel controlId="price" label="Price" className="mb-3">
                  <Form.Control
                    type="number"
                    name="price"
                    placeholder="Price ... "
                    value={addRoom ? info?.price : editData?.price}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="maxPeople"
                  label="Max People"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    name="maxPeople"
                    placeholder="Enter  Total Member Number ... "
                    value={addRoom ? info?.maxPeople : editData?.maxPeople}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <FloatingLabel
              controlId="desc"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                type="text-area"
                name="desc"
                placeholder="Enter Description ... "
                height={300}
                value={addRoom ? info?.desc : editData?.desc}
                onChange={handleChange}
              />
            </FloatingLabel>
            {/* <Row>
              <Col>
                <FloatingLabel controlId="featured" label="Featured hotel">
                  <Form.Select
                    name="featured"
                    onChange={handleChange}
                    value={addRoom ? info?.featured : editData?.featured}
                  >
                    <option>Is it Featured hotel ?</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row> */}

            <button type="submit" className="headerBtn banner-btn mt-3 w-100">
              {addRoom ? "Create" : "UPDATE"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RoomModal;