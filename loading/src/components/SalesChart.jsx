"use client";

import React from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";

// Importação dinâmica para evitar problemas com SSR
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function SalesChart({ title, categories, seriesData, footer }) {
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "55%" },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: { categories: categories },
    yaxis: { title: { text: "Vendas" } },
    fill: { opacity: 1 },
    tooltip: {
      y: { formatter: (val) => `R$ ${val}` },
    },
  };

  const series = [
    {
      name: "Vendas",
      data: seriesData,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <Chart options={options} series={series} type="bar" height={250} />
      {footer && <div className="mt-2 text-xs text-gray-500">{footer}</div>}
    </div>
  );
}

SalesChart.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  seriesData: PropTypes.arrayOf(PropTypes.number).isRequired,
  footer: PropTypes.node,
};
