"use client";
import React, { useState } from "react";
import {
  Send,
  Save,
  Plus,
  ChevronDown,
  Menu,
  Play,
  Code,
  Copy,
  Trash2,
  FileText,
} from "lucide-react";

const Postman = () => {
  // State Management
  const [activeTab, setActiveTab] = useState("params");
  const [method, setMethod] = useState("GET");
  const [showMethodDropdown, setShowMethodDropdown] = useState(false);
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts");
  const [params, setParams] = useState([
    { key: "page", value: "1", description: "Page number", enabled: true },
    { key: "limit", value: "10", description: "Results per page", enabled: true },
  ]);
  const [headers, setHeaders] = useState([
    { key: "Content-Type", value: "application/json", enabled: true },
  ]);
  const [bodyType, setBodyType] = useState("json");
  const [bodyContent, setBodyContent] = useState(`{
  "title": "foo",
  "body": "bar",
  "userId": 1
}`);
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const [statusText, setStatusText] = useState("");
  const [responseTime, setResponseTime] = useState(null);

  const methods = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"];

  // Send Request Function
  const sendRequest = async () => {
    try {
      // Construct query string for GET requests
      const queryString = params
        .filter((p) => p.enabled)
        .map((p) => ${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)})
        .join("&");
      const fullUrl = method === "GET" && queryString ? ${url}?${queryString} : url;

      // Construct headers
      const requestHeaders = headers
        .filter((h) => h.enabled)
        .reduce((acc, h) => {
          acc[h.key] = h.value;
          return acc;
        }, {});

      // Prepare fetch options
      const options = {
        method,
        headers: requestHeaders,
      };

      if (["POST", "PUT", "PATCH"].includes(method) && bodyType === "json") {
        options.body = bodyContent;
      }

      // Send request and measure time
      const startTime = Date.now();
      const res = await fetch(fullUrl, options);
      const endTime = Date.now();
      const time = endTime - startTime;

      // Parse response
      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      // Update state with response details
      setResponse(data);
      setStatus(res.status);
      setStatusText(res.statusText);
      setResponseTime(time);
    } catch (error) {
      console.error("Request failed:", error);
      setResponse({ error: error.message });
      setStatus(null);
      setStatusText("");
      setResponseTime(null);
    }
  };

  // Render Component
  return (
    <div className="flex flex-col h-screen bg-zinc-50 text-zinc-900">
      {/* Header */}
      <header className="bg-purple-700 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Menu className="w-5 h-5" />
          <h1 className="text-xl font-bold">API Tools</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-purple-600 hover:bg-purple-800 px-4 py-2 rounded-md flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
          <div className="w-8 h-8 bg-purple-300 rounded-full flex items-center justify-center text-purple-800 font-bold">
            D
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col">
          <div className="p-4 border-b border-zinc-200">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">Collections</h2>
              <button className="text-purple-600 hover:bg-purple-50 p-1 rounded">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <div className="p-2 hover:bg-zinc-100 rounded cursor-pointer flex items-center space-x-2">
              <FileText className="w-4 h-4 text-zinc-500" />
              <span>User API</span>
            </div>
            <div className="p-2 hover:bg-zinc-100 rounded cursor-pointer flex items-center space-x-2">
              <FileText className="w-4 h-4 text-zinc-500" />
              <span>Product API</span>
            </div>
            <div className="p-2 bg-purple-50 text-purple-700 rounded cursor-pointer flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Authentication</span>
            </div>
          </div>
        </aside>

        {/* Main Panel */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Request Panel */}
          <div className="p-4 border-b border-zinc-200">
            <div className="flex items-center space-x-2 mb-4">
              {/* Method Selector */}
              <div className="relative">
                <button
                  className={`px-3 py-2 rounded font-medium flex items-center space-x-1 ${
                    method === "GET"
                      ? "bg-green-100 text-green-800"
                      : method === "POST"
                      ? "bg-yellow-100 text-yellow-800"
                      : method === "PUT"
                      ? "bg-blue-100 text-blue-800"
                      : method === "DELETE"
                      ? "bg-red-100 text-red-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                  onClick={() => setShowMethodDropdown(!showMethodDropdown)}
                >
                  <span>{method}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showMethodDropdown && (
                  <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg border border-zinc-200 py-1 w-32">
                    {methods.map((m) => (
                      <div
                        key={m}
                        className="px-4 py-2 hover:bg-zinc-100 cursor-pointer flex items-center"
                        onClick={() => {
                          setMethod(m);
                          setShowMethodDropdown(false);
                        }}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${
                            m === "GET"
                              ? "bg-green-500"
                              : m === "POST"
                              ? "bg-yellow-500"
                              : m === "PUT"
                              ? "bg-blue-500"
                              : m === "DELETE"
                              ? "bg-red-500"
                              : "bg-purple-500"
                          }`}
                        ></span>
                        {m}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* URL Input */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter request URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              {/* Send Button */}
              <button
                onClick={sendRequest}
                className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center border-b border-zinc-200">
              {["params", "headers", "body", "auth"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-purple-600 text-purple-700"
                      : "text-zinc-600 hover:text-purple-600"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 flex-1 overflow-y-auto">
            {/* Params Tab */}
            {activeTab === "params" && (
              <div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 text-left text-zinc-600">
                      <th className="p-2 w-10"></th>
                      <th className="p-2 w-1/3">KEY</th>
                      <th className="p-2 w-1/3">VALUE</th>
                      <th className="p-2 w-1/3">DESCRIPTION</th>
                      <th className="p-2 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {params.map((param, index) => (
                      <tr key={index}>
                        <td className="p-2">
                          <input
                            type="checkbox"
                            checked={param.enabled}
                            onChange={(e) => {
                              const newParams = [...params];
                              newParams[index].enabled = e.target.checked;
                              setParams(newParams);
                            }}
                            className="rounded text-purple-600"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={param.key}
                            onChange={(e) => {
                              const newParams = [...params];
                              newParams[index].key = e.target.value;
                              setParams(newParams);
                            }}
                            className="w-full p-2 border border-zinc-300 rounded"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={param.value}
                            onChange={(e) => {
                              const newParams = [...params];
                              newParams[index].value = e.target.value;
                              setParams(newParams);
                            }}
                            className="w-full p-2 border border-zinc-300 rounded"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={param.description}
                            onChange={(e) => {
                              const newParams = [...params];
                              newParams[index].description = e.target.value;
                              setParams(newParams);
                            }}
                            className="w-full p-2 border border-zinc-300 rounded"
                          />
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => {
                              setParams(params.filter((_, i) => i !== index));
                            }}
                            className="text-zinc-500 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={() =>
                    setParams([
                      ...params,
                      { key: "", value: "", description: "", enabled: true },
                    ])
                  }
                  className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Add Param
                </button>
              </div>
            )}

            {/* Headers Tab */}
            {activeTab === "headers" && (
              <div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 text-left text-zinc-600">
                      <th className="p-2 w-10"></th>
                      <th className="p-2 w-1/3">KEY</th>
                      <th className="p-2 w-1/3">VALUE</th>
                      <th className="p-2 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {headers.map((header, index) => (
                      <tr key={index}>
                        <td className="p-2">
                          <input
                            type="checkbox"
                            checked={header.enabled}
                            onChange={(e) => {
                              const newHeaders = [...headers];
                              newHeaders[index].enabled = e.target.checked;
                              setHeaders(newHeaders);
                            }}
                            className="rounded text-purple-600"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={header.key}
                            onChange={(e) => {
                              const newHeaders = [...headers];
                              newHeaders[index].key = e.target.value;
                              setHeaders(newHeaders);
                            }}
                            className="w-full p-2 border border-zinc-300 rounded"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={header.value}
                            onChange={(e) => {
                              const newHeaders = [...headers];
                              newHeaders[index].value = e.target.value;
                              setHeaders(newHeaders);
                            }}
                            className="w-full p-2 border border-zinc-300 rounded"
                          />
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => {
                              setHeaders(headers.filter((_, i) => i !== index));
                            }}
                            className="text-zinc-500 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={() =>
                    setHeaders([
                      ...headers,
                      { key: "", value: "", enabled: true },
                    ])
                  }
                  className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Add Header
                </button>
              </div>
            )}

            {/* Body Tab */}
            {activeTab === "body" && (
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-4 mb-4">
                  {["none", "json"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="body-type"
                        id={type}
                        checked={bodyType === type}
                        onChange={() => setBodyType(type)}
                        className="text-purple-600"
                      />
                      <label htmlFor={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
                {bodyType === "json" && (
                  <textarea
                    value={bodyContent}
                    onChange={(e) => setBodyContent(e.target.value)}
                    className="flex-1 bg-zinc-900 text-white rounded p-2 font-mono text-sm resize-none"
                  />
                )}
              </div>
            )}

            {/* Auth Tab (Placeholder) */}
            {activeTab === "auth" && <div>Authentication not implemented yet.</div>}
          </div>

          {/* Response Panel */}
          <div className="border-t border-zinc-200 flex-1 flex flex-col min-h-64">
            <div className="bg-zinc-100 p-2 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="font-medium">Response</h3>
                {status && (
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      status >= 200 && status < 300
                        ? "bg-green-100 text-green-800"
                        : status >= 400
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {status} {statusText}
                  </span>
                )}
                {responseTime && (
                  <span className="text-zinc-500 text-sm">{responseTime} ms</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 hover:bg-zinc-200 rounded">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-zinc-200 rounded">
                  <Code className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 p-4 bg-zinc-50 overflow-auto">
              {response && (
                <pre className="bg-zinc-900 text-white p-4 rounded font-mono text-sm overflow-auto">
                  {typeof response === "object" ? JSON.stringify(response, null, 2) : response}
                </pre>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Postman;