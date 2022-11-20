import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Pages/Shared/ConfirmationModal/ConfirmationModal';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);

    const closeModal = () => {
        setDeletingDoctor(null);
    }

    const {data: doctors = [], refetch} = useQuery({
        queryKey: ['doctors'],
        queryFn: async() => {
            const res = await fetch('http://localhost:5000/doctors',{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    
    const handleDeleteDoctor = doctor => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE', 
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                refetch();
                toast.success(`Doctor ${doctor.name} deleted successfully`)
            }
        })
    }

    return (
        <div className="px-10">
      <h1 className="text-3xl font-semibold my-10">All Users</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Email</th>
              <th>Speciality</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
                doctors?.map((doctor,i) => <tr key={doctor._id}>
                    <th>{i+1}</th>
                    <td>
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src={doctor.image} alt="" />
                            </div>
                        </div>
                    </td>
                    <td>{doctor.name}</td>
                    <td>{doctor.speciality}</td>
                    <td>
                        <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-xs btn-error">Delete</label>
                    </td>
                  </tr>)
            }
          </tbody>
        </table>
      </div>
        {
            deletingDoctor && <ConfirmationModal
                title={`Are you sure you want to delete?`}
                message={`If you delete ${deletingDoctor.name}. It cannot be undone.`}
                successAction = {handleDeleteDoctor}
                successButtonName="Delete"
                modalData = {deletingDoctor}
                closeModal = {closeModal}
            >
            </ConfirmationModal>
        }
    </div>
    );
};

export default ManageDoctors;