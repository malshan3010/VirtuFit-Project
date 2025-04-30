import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card, CardContent, Typography, Grid, Button, CircularProgress,
  LinearProgress, Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Bar, Line } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { useTheme } from '@mui/material/styles';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const HomePage = () => {
  const [inventoryReport, setInventoryReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lowStockModalOpen, setLowStockModalOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const fetchInventoryReport = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products/inventory-report');
        setInventoryReport(response.data);
      } catch (err) {
        setError('Error fetching inventory report');
      } finally {
        setLoading(false);
      }
    };
    fetchInventoryReport();
  }, []);

  const handleOpenLowStockModal = () => setLowStockModalOpen(true);
  const handleCloseLowStockModal = () => setLowStockModalOpen(false);

  const downloadReportAsPDF = () => {
    if (!inventoryReport || !inventoryReport.products) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Inventory Report', 14, 15);

    // Add current date
    const now = new Date();
    const formattedDate = now.toLocaleString();
    doc.setFontSize(12);
    doc.text(`Generated on: ${formattedDate}`, 14, 25);

    const inStockItems = inventoryReport.products.filter(p => p.inStock === 'In Stock');
    const lowStockItems = inventoryReport.products.filter(p => p.stockQuantity <= 10 && p.inStock === 'In Stock');
    const outOfStockItems = inventoryReport.products.filter(p => p.inStock === 'Out of Stock');
    const categories = Object.keys(inventoryReport.products.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {}));

    autoTable(doc, {
      startY: 35,
      head: [['Product Name', 'SKU', 'Category', 'Stock Quantity']],
      body: inventoryReport.products.map(item => [item.name, item.sku, item.category, item.stockQuantity]),
    });

    doc.addPage();
    doc.text('In Stock Items:', 14, 15);
    autoTable(doc, {
      startY: 25,
      head: [['Product Name', 'SKU', 'Stock Quantity']],
      body: inStockItems.map(item => [item.name, item.sku, item.stockQuantity]),
    });

    doc.addPage();
    doc.text('Low Stock Items:', 14, 15);
    autoTable(doc, {
      startY: 25,
      head: [['Product Name', 'SKU', 'Stock Quantity']],
      body: lowStockItems.map(item => [item.name, item.sku, item.stockQuantity]),
    });

    doc.addPage();
    doc.text('Out of Stock Items:', 14, 15);
    autoTable(doc, {
      startY: 25,
      head: [['Product Name', 'SKU']],
      body: outOfStockItems.map(item => [item.name, item.sku]),
    });

    doc.addPage();
    doc.text('Available Categories:', 14, 15);
    autoTable(doc, {
      startY: 25,
      head: [['Category']],
      body: categories.map(c => [c]),
    });

    doc.save('inventory_report.pdf');
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>;
  if (error) return <div>{error}</div>;

  const inStockItems = inventoryReport.products.filter(p => p.inStock === 'In Stock');
  const lowStockItems = inventoryReport.products.filter(p => p.stockQuantity <= 10 && p.inStock === 'In Stock');
  const outOfStockItems = inventoryReport.products.filter(p => p.inStock === 'Out of Stock');
  const categories = inventoryReport.products.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: 'Product Categories',
        data: Object.values(categories),
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.dark,
        borderWidth: 1,
      },
    ],
  };

  const stockChangesOverTime = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'In Stock',
        data: [120, 110, 100, 130, 150, 140],
        fill: false,
        backgroundColor: theme.palette.success.main,
        borderColor: theme.palette.success.dark,
        tension: 0.4,
      },
      {
        label: 'Out of Stock',
        data: [30, 40, 50, 45, 35, 20],
        fill: false,
        backgroundColor: theme.palette.error.main,
        borderColor: theme.palette.error.dark,
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={dashboardContainer}>
      <Typography variant="h4" align="center" gutterBottom style={headingStyle}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={downloadReportAsPDF}
            style={downloadButtonStyle}
          >
            Download Inventory Report
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '20px' }}>
        <Grid item xs={6} md={3}><Card style={cardStyle}><CardContent><Typography variant="h6">Total Products</Typography><Typography variant="h3">{inventoryReport.totalProducts}</Typography></CardContent></Card></Grid>
        <Grid item xs={6} md={3}><Card style={cardStyle}><CardContent><Typography variant="h6">In Stock Items</Typography><Typography variant="h3">{inventoryReport.inStockItems}</Typography><LinearProgress variant="determinate" value={(inStockItems.length / inventoryReport.totalProducts) * 100} style={{ marginTop: '10px', height: '6px', borderRadius: '5px' }} color="success" /></CardContent></Card></Grid>
        <Grid item xs={6} md={3}><Card style={cardStyle}><CardContent><Typography variant="h6">Out of Stock Items</Typography><Typography variant="h3">{inventoryReport.outOfStockItems}</Typography><LinearProgress variant="determinate" value={(outOfStockItems.length / inventoryReport.totalProducts) * 100} style={{ marginTop: '10px', height: '6px', borderRadius: '5px' }} color="error" /></CardContent></Card></Grid>
        <Grid item xs={6} md={3}><Card style={{ ...cardStyle, cursor: 'pointer' }} onClick={handleOpenLowStockModal}><CardContent><Typography variant="h6">Low Stock Alerts</Typography><Typography variant="h3">{lowStockItems.length}</Typography></CardContent></Card></Grid>

        <Dialog open={lowStockModalOpen} onClose={handleCloseLowStockModal} fullWidth maxWidth="sm">
          <DialogTitle>Low Stock Items</DialogTitle>
          <DialogContent dividers>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lowStockItems.map(item => (
                  <TableRow key={item.sku}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell align="right">{item.stockQuantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLowStockModal} color="primary">Close</Button>
          </DialogActions>
        </Dialog>

        <Grid item xs={12} md={6}><Card style={cardStyle}><CardContent><Typography variant="h6">Product Category Breakdown</Typography><Bar data={barChartData} /></CardContent></Card></Grid>
        <Grid item xs={12} md={6}><Card style={cardStyle}><CardContent><Typography variant="h6">Stock Changes Over Time</Typography><Line data={stockChangesOverTime} /></CardContent></Card></Grid>

        <Grid item xs={12}><Card style={cardStyle}><CardContent><Typography variant="h6">Out of Stock Items</Typography><Paper elevation={3}><Table size="small"><TableHead><TableRow><TableCell>Product Name</TableCell><TableCell align="right">SKU</TableCell></TableRow></TableHead><TableBody>{outOfStockItems.map(item => (<TableRow key={item.sku}><TableCell>{item.name}</TableCell><TableCell align="right">{item.sku}</TableCell></TableRow>))}</TableBody></Table></Paper></CardContent></Card></Grid>
      </Grid>
    </div>
  );
};

// Styles
const dashboardContainer = {
  padding: '20px',
  maxWidth: '1200px',
  margin: '0 auto',
  backgroundColor: '#f7f9fc',
};

const cardStyle = {
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  backgroundColor: '#fff',
};

const downloadButtonStyle = {
  backgroundColor: '#1976d2',
  color: '#fff',
  padding: '12px 25px',
  fontSize: '16px',
  borderRadius: '10px',
  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
  marginBottom: '25px'
};

const headingStyle = {
  marginTop: '30px',
  fontWeight: 'bold',
  textAlign: 'center',
};

export default HomePage;
