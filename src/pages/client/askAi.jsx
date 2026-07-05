import { useState } from "react";
import axios from "axios";

export default function AIRecommender() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!prompt.trim()) return; // Don't send empty requests
    
    setLoading(true);
    setResult(""); // Clear previous results while loading
    
    try {
      const res = await axios.post("http://localhost:5000/api/ai/recommend", {
        prompt,
      });
      setResult(res.data.answer);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setResult("Failed to get recommendation. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Optional helper to handle quick suggestion clicks
  const handleSuggestionClick = (suggestion) => {
    setPrompt(suggestion);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 antialiased selection:bg-indigo-100">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all">
        
        {/* Header with AI Accent */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-100">
            {/* Sparkles SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21L8.188 15.904L3 15L8.188 14.096L9 9L9.813 14.096L15 15L9.813 15.904Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.071 4.929l-.544 3.421l-3.421.544l3.421.544l.544 3.421l.544-3.421l3.421-.544l-3.421-.544z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 bg-clip-text text-transparent tracking-tight">
              AI Laptop Recommender
            </h1>
            <p className="text-xs text-slate-400 font-medium">Powered by Gemini Pro</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          {/* Prompt Box Container */}
          <div className="relative flex flex-col rounded-xl border border-slate-200 bg-white p-3 shadow-sm focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
            <textarea 
              id="ai-prompt"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Need laptop for programming under $800"
              className="w-full resize-none bg-transparent px-2 py-1 text-sm text-slate-800 placeholder-slate-400 focus:outline-none leading-relaxed"
              disabled={loading}
            />
            
            {/* Prompt Footer Toolbar */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-2">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 pl-2">
                Press <kbd className="font-sans px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px]">Generate</kbd> to send
              </span>
              
              <button 
                onClick={askAI}
                disabled={loading || !prompt.trim()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600 active:bg-indigo-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-900"
              >
                <span>{loading ? "Thinking..." : "Generate"}</span>
                {/* Send SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3 w-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="flex flex-wrap gap-1.5 -mt-2">
            <button 
              onClick={() => handleSuggestionClick("Best coding laptop under $800")}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-100 transition-colors"
            >
              💻 Coding Under $800
            </button>
            <button 
              onClick={() => handleSuggestionClick("High performance gaming laptop with clean design")}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-100 transition-colors"
            >
              🎮 Clean Gaming Setup
            </button>
          </div>

          {/* Response Area */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 px-1">
              {/* Bot SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 text-indigo-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
              </svg>
              <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
                Recommendation
              </span>
            </div>
            
            <div className="w-full min-h-[160px] max-h-[320px] overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/70 p-4 text-sm text-slate-700 leading-relaxed custom-scrollbar">
              {loading ? (
                /* Loading State Display */
                <div className="flex items-center justify-center h-full min-h-[120px] gap-2">
                  <div className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce"></div>
                </div>
              ) : result ? (
                /* Dynamic AI Recommendation Content Display */
                <pre className="whitespace-pre-wrap font-sans text-slate-800">{result}</pre>
              ) : (
                /* Empty Empty State */
                <div className="flex items-center justify-center h-full min-h-[120px]">
                  <p className="text-slate-400 text-xs font-medium max-w-[260px] text-center leading-normal">
                    Type your target budget or use-case requirements above to get engineered laptop matches.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}