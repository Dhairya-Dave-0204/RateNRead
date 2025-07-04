import React from 'react'

function StatCard({ icon, label, value, color }) {
  return (
    <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="mt-2 text-3xl font-bold" style={{ color }}>
            {value}
          </p>
        </div>
        <div
          className="p-3 rounded-full"
          style={{ backgroundColor: color + "20" }}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatCard