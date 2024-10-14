import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';

import TableHeader from '@crema/components/AppTable/TableHeader';
import { Autorenew } from '@mui/icons-material';

const TableHeading = ({ handleReverseDate, handleReverseOrder }) => {
  const [newestOrder, setNewestOrder] = useState(false);
  const handleSwitchDate = () => {
    setNewestOrder((prev) => !prev);
    handleReverseDate(newestOrder);
  };

  const [orderType, setOrderType] = useState({
     title: false,
    client: false,
    business: false,
    role: false,
    status: false,
  });

  const handleSwitchOrder = (type) => {
     if (type === 'title') {
      setOrderType({ ...orderType, title: !orderType.title });
    }
    if (type === 'client') {
      setOrderType({ ...orderType, client: !orderType.client });
    }
    if (type === 'business') {
      setOrderType({ ...orderType, business: !orderType.business });
    }
    if (type === 'role') {
      setOrderType({ ...orderType, role: !orderType.role });
    }
    if (type === 'status') {
      setOrderType({ ...orderType, status: !orderType.status });
    }

    handleReverseOrder(type, orderType);
  };

  return (
    <TableHeader sx={{border: "2px solid red"}}>
    
      <TableCell sx={{display: "flex", justifyContent: "flex-start",  marginLeft: "-20px", }} align='left' onClick={() => handleSwitchOrder('title')}>
        Title
      </TableCell>
      <TableCell align='left' onClick={() => handleSwitchOrder('client')}>
        Client
      </TableCell>
      <TableCell align='left' onClick={() => handleSwitchOrder('business')}>
        Business
      </TableCell>
      <TableCell align='left' onClick={() => handleSwitchOrder('role')}>
        Role
      </TableCell>
      <TableCell align='left' onClick={() => handleSwitchOrder('status')}>
        Status
      </TableCell>
      <TableCell align='left' onClick={() => handleSwitchOrder('budget')}>
        Budget
      </TableCell>
      <TableCell align='left'>
        {' '}
        Date
        <Autorenew sx={{ height: '15px' }} onClick={handleSwitchDate} />
      </TableCell>
      <TableCell align='left'>Users</TableCell>
      <TableCell align='left'></TableCell>
    </TableHeader>
  );
};

export default TableHeading;
