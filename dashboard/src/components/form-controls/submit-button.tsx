import React from 'react';

const SubmitButton: React.FC<{
  label: string;
  bg?: string;
  type?: 'button' | 'submit' | 'reset';
}> = (props) => {
  return (
    <div className="d-flex justify-content-end mt-2">
      <button
        className={`btn ${
          props.bg ? 'btn-' + props.bg : 'btn-dark'
        } rounded-3 px-5 py-2 fs-6`}
        type={props.type}
      >
        {props.label}
      </button>
    </div>
  );
};
export default SubmitButton;
