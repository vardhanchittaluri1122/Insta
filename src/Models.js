import ReactDom from 'react-dom'
import React, { useRef } from 'react'
import "./App.css"
import { useDispatch } from 'react-redux';
import { edit } from './Redux/Recive';

export default function Models({onClose}) {
  const num = useRef(null);
  const name = useRef(null);
  const email = useRef(null);
  const dispatch = useDispatch();

  const update = (e) => {
    e.preventDefault();
    dispatch(edit({
      num: num.current.value,
      name: name.current.value,
      email: email.current.value
    }));
   
  };

  return ReactDom.createPortal(
    <form onSubmit={update}>
      <div className="modal-backdrop">
        <div className="modal-content">
          <h2>Edit User</h2>
          <input type='number' ref={num} />
          <input type='text' ref={name} />
          <input type='text' ref={email} />
          <div>
            <button type="submit">Submit</button>
            <button type="button"  onClick={onClose}>cancel chey</button>
          </div>
        </div>
      </div>
    </form>,
    document.body
  );
}
