import { useState } from "react";
import axios from "axios";
import { Flame, Activity, GaugeCircle, Zap } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function App() {
  const [formData, setFormData] = useState({
    blast_temp_C: 1150,
    coke_rate_kg_per_t: 380,
    pci_rate_kg_per_t: 145,
    air_flow_Nm3_min: 5100,
    top_gas_pressure_bar: 2.3,
    moisture_g_Nm3: 18,
    ore_grade_pct: 63,
    burden_index: 1.1,
    fuel_rate_kg_per_t: 690,
  });

  const [predictedOutput, setPredictedOutput] = useState(7413.21);
  const [predictedEfficiency, setPredictedEfficiency] = useState(42);
  const [optimizedOutput, setOptimizedOutput] = useState(null);
  const [optimizedEfficiency, setOptimizedEfficiency] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [originalValues, setOriginalValues] = useState(null);

  const [predictLoading, setPredictLoading] = useState(false);
  const [optimizeLoading, setOptimizeLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const labels = {
    blast_temp_C: "Blast Temperature",
    coke_rate_kg_per_t: "Coke Rate",
    pci_rate_kg_per_t: "PCI Rate",
    air_flow_Nm3_min: "Air Flow",
    top_gas_pressure_bar: "Gas Pressure",
    moisture_g_Nm3: "Moisture",
    ore_grade_pct: "Ore Grade",
    burden_index: "Burden Index",
    fuel_rate_kg_per_t: "Fuel Rate",
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value)
    });
  };

  const handlePredict = async () => {
    try {
      setPredictLoading(true);

      const response = await axios.post(
        "https://blast-furnace-backend.onrender.com/predict",
        formData
      );

      setPredictedOutput(response.data.predicted_output);
      setPredictedEfficiency(response.data.predicted_efficiency);

    } catch (error) {
      alert("Prediction failed");
    } finally {
      setPredictLoading(false);
    }
  };

  const handleOptimize = async () => {
    try {
      setOptimizeLoading(true);
      setOriginalValues({ ...formData });

      const response = await axios.post(
        "https://blast-furnace-backend.onrender.com/optimize",
        formData
      );

setOptimizedOutput(response.data.best_output);
setOptimizedEfficiency(response.data.optimized_efficiency);
setRecommendations(response.data.recommended_parameters);

    } catch (error) {
      alert("Optimization failed");
    } finally {
      setOptimizeLoading(false);
    }
  };

const applyRecommendations = () => {
  if (recommendations) {
    setFormData(recommendations);
    setToastMessage("✅ AI Recommendations Applied Successfully");
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  }
};

const restoreOriginalValues = () => {
  if (originalValues) {
    setFormData(originalValues);
    setToastMessage("↩️ Original Values Restored");
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  }
};

  const optimizationGain =
    optimizedOutput && predictedOutput
      ? (optimizedOutput - predictedOutput).toFixed(2)
      : "--";

  let furnaceStatus = "Stable";
  let statusColor = "text-green-400";

  if (predictedEfficiency < 25) {
    furnaceStatus = "Critical";
    statusColor = "text-red-400";
  } else if (predictedEfficiency < 40) {
    furnaceStatus = "Warning";
    statusColor = "text-yellow-400";
  }

  const chartData = [
    {
      name: "Current Output",
      value: predictedOutput
    },
    {
      name: "Optimized Output",
      value: optimizedOutput || predictedOutput
    }
  ];

const efficiencyChartData = [
  {
    name: "Current",
    efficiency: predictedEfficiency
  },
  {
    name: "Optimized",
    efficiency: optimizedEfficiency || predictedEfficiency
  }
];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {showToast && (
  <div className="fixed top-6 right-6 z-50 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl transition-all duration-500">
    {toastMessage}
  </div>
)}

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Flame className="w-10 h-10 text-orange-500" />
          <div>
            <h1 className="text-4xl font-bold">
              Blast Furnace Optimization System
            </h1>
            <p className="text-slate-400">
              AI-Powered Industrial Monitoring & Optimization Dashboard
            </p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg">
            <div className="flex justify-between">
              <div>
                <p className="text-slate-400">Predicted Output</p>
                <h2 className="text-3xl font-bold mt-2 text-cyan-400 animate-pulse">
                  {predictedOutput} TPD
                </h2>
              </div>
              <Activity className="text-cyan-400 w-8 h-8" />
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg">
            <div className="flex justify-between">
              <div>
                <p className="text-slate-400">Predicted Efficiency</p>
                <h2 className="text-3xl font-bold mt-2 text-green-400 animate-pulse">
                  {predictedEfficiency}%
                </h2>
              </div>
              <GaugeCircle className="text-green-400 w-8 h-8" />
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg">
            <div className="flex justify-between">
              <div>
                <p className="text-slate-400">Optimization Gain</p>
                <h2 className="text-3xl font-bold mt-2 text-yellow-400 animate-pulse">
                  {optimizationGain} TPD
                </h2>
              </div>
              <Zap className="text-yellow-400 w-8 h-8" />
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg">
            <div className="flex justify-between">
              <div>
                <p className="text-slate-400">Furnace Status</p>
                <h2 className={`text-2xl font-bold mt-2 ${statusColor}`}>
                  {furnaceStatus}
                </h2>
              </div>
              <Flame className="text-orange-500 w-8 h-8" />
            </div>
          </div>

        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Inputs */}
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold mb-6">
              Furnace Input Parameters
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(formData).map((key) => (
                <div key={key}>
                  <label className="block mb-2 text-slate-300">
                    {labels[key]}
                  </label>

                  <input
                    type="number"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handlePredict}
                disabled={predictLoading}
                className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl font-semibold"
              >
                {predictLoading ? "Predicting..." : "Predict Output"}
              </button>

              <button
                onClick={handleOptimize}
                disabled={optimizeLoading}
                className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold"
              >
                {optimizeLoading ? "Optimizing..." : "Optimize"}
              </button>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold mb-6">
              AI Optimization Recommendations
            </h2>

            {!recommendations ? (
              <p className="text-slate-400">
                Click Optimize to get AI recommendations.
              </p>
            ) : (
              <div className="space-y-4">
                {Object.entries(recommendations)
                  .filter(([key, value]) => originalValues[key] !== value)
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-slate-800 rounded-xl p-5"
                    >
                      <p className="text-slate-300 text-sm">
                        {labels[key]}
                      </p>

                      <div className="flex justify-between mt-2">
                        <span className="text-red-400 font-semibold">
                          Current: {originalValues[key]}
                        </span>

                        <span className="text-green-400 font-semibold">
                          Recommended: {value}
                        </span>
                      </div>
                    </div>
                  ))}

                <div className="bg-cyan-900/30 border border-cyan-700 rounded-xl p-5 mt-6">
                  <h3 className="font-bold text-cyan-300 mb-2">
                    Expected Optimization Gain
                  </h3>

                  <p className="text-2xl font-bold text-cyan-400">
                    +{optimizationGain} TPD
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
  <button
    onClick={applyRecommendations}
    className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold transition"
  >
    Apply AI Recommendations
  </button>

  <button
    onClick={restoreOriginalValues}
    className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-semibold transition"
  >
    Restore Original
  </button>
</div>
              </div>
            )}
          </div>

        </div>

        {/* Chart */}
        <div className="mt-8 bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            Optimization Performance Analysis
          </h2>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tick={{ fill: "#cbd5e1", fontSize: 14 }}
                />

                <YAxis
                  stroke="#94a3b8"
                  tick={{ fill: "#cbd5e1", fontSize: 14 }}
                  domain={["dataMin - 100", "dataMax + 100"]}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    color: "#fff"
                  }}
                  labelStyle={{
                    color: "#38bdf8"
                  }}
                  cursor={{ fill: "rgba(6, 182, 212, 0.08)" }}
                />

                <Bar
                  dataKey="value"
                  fill="#06b6d4"
                  radius={[14, 14, 0, 0]}
                  label={{
                    position: "top",
                    fill: "#ffffff",
                    fontSize: 14
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/*line chart part*/}
        <div className="mt-8 bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-lg">
  <h2 className="text-2xl font-bold mb-6">
    Efficiency Performance Trend
  </h2>

  <div className="h-96">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={efficiencyChartData}>
        <XAxis
          dataKey="name"
          stroke="#94a3b8"
          tick={{ fill: "#cbd5e1", fontSize: 14 }}
        />

        <YAxis
          stroke="#94a3b8"
          tick={{ fill: "#cbd5e1", fontSize: 14 }}
          domain={[0, 100]}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "#0f172a",
            border: "1px solid #334155",
            borderRadius: "12px",
            color: "#fff"
          }}
          labelStyle={{
            color: "#22c55e"
          }}
        />

        <Line
          type="monotone"
          dataKey="efficiency"
          stroke="#22c55e"
          strokeWidth={4}
          dot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>




      </div>
    </div>
  );
}

export default App;