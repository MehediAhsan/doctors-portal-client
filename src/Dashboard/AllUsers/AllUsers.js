import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllUsers = () => {
    const {data: users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async() => {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            return data;
        }
    })

    return (
        <div className="px-10">
      <h1 className="text-3xl font-semibold my-10">All Users</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {
                users?.map((user,i) => <tr key={user._id}>
                    <th>{i+1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>Update</td>
                    <td>Delete</td>
                  </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default AllUsers;