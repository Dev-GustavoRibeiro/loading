"use client";

import React from "react";
import PropTypes from "prop-types";

export default function ChartCard({ title, footer }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <div className="h-40 bg-gray-200 rounded flex items-center justify-center">
        <span className="text-gray-500">Chart Placeholder</span>
      </div>
      {footer && <div className="mt-2 text-xs text-gray-500">{footer}</div>}
    </div>
  );
}

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  footer: PropTypes.node,
};
