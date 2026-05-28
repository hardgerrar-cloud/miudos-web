"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

interface TrackingLog {
  logId: string;
  eventName: string;
  eventId: string;
  params: Record<string, unknown>;
  timestamp: string;
  browserStatus: string;
  serverStatus: string;
  browserError?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serverResponse?: any;
}

export default function PixelDebug() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isDebug = searchParams.get("debug_pixel") === "1";
  const [logs, setLogs] = useState<TrackingLog[]>([]);
  const [fbqStatus, setFbqStatus] = useState<boolean>(false);
  const [_fbqStatus, set_FbqStatus] = useState<boolean>(false);

  useEffect(() => {
    if (!isDebug) return;

    const updateState = () => {
      setFbqStatus(typeof window !== "undefined" && !!window.fbq);
      set_FbqStatus(typeof window !== "undefined" && !!window._fbq);
      
      try {
        const logsStr = sessionStorage.getItem("miudos_tracking_log");
        if (logsStr) {
          setLogs(JSON.parse(logsStr));
        }
      } catch {
        // ignore
      }
    };

    updateState();
    const interval = setInterval(updateState, 1000);
    
    const handleUpdate = () => updateState();
    window.addEventListener("miudos_tracking_updated", handleUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener("miudos_tracking_updated", handleUpdate);
    };
  }, [isDebug]);

  if (!isDebug) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-black/95 text-white text-[11px] p-3 max-h-[60vh] overflow-y-auto border-t border-accent-neon font-mono shadow-[0_-10px_30px_rgba(0,255,136,0.3)] backdrop-blur-md">
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/20">
        <h3 className="text-accent-neon font-bold text-sm">🛠️ MIÚDOS WEB PIXEL DEBUG</h3>
        <span className="text-gray-400">{pathname}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4 bg-white/5 p-3 rounded-lg border border-white/10">
        <div>
          <span className="text-gray-400 block text-[9px] uppercase tracking-wider mb-1">Pixel ID</span> 
          <span className="font-bold">{siteConfig.pixelId}</span>
        </div>
        <div>
          <span className="text-gray-400 block text-[9px] uppercase tracking-wider mb-1">Mounted Mobile</span> 
          <span className="text-accent-neon font-bold">YES</span>
        </div>
        <div>
          <span className="text-gray-400 block text-[9px] uppercase tracking-wider mb-1">window.fbq</span> 
          <span className={`font-bold ${fbqStatus ? "text-accent-neon" : "text-red-400"}`}>{fbqStatus ? "READY" : "MISSING"}</span>
        </div>
        <div>
          <span className="text-gray-400 block text-[9px] uppercase tracking-wider mb-1">window._fbq</span> 
          <span className={`font-bold ${_fbqStatus ? "text-accent-neon" : "text-red-400"}`}>{_fbqStatus ? "READY" : "MISSING"}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center sticky top-0 bg-black/95 py-2 z-10 border-b border-white/10 mb-2">
          <h4 className="text-gray-400 font-bold">LAST EVENTS ({logs.length})</h4>
          <span className="text-[10px] text-gray-500">Auto-updating</span>
        </div>
        {logs.slice().reverse().map((log, i) => (
          <div key={i} className={`p-3 rounded-lg border ${log.browserStatus === 'FAILED' && log.serverStatus === 'FAILED' ? 'border-red-500/50 bg-red-500/10' : log.serverStatus === 'SUCCESS' ? 'border-white/10 bg-white/5' : 'border-yellow-500/50 bg-yellow-500/10'}`}>
            <div className="flex justify-between items-center mb-1">
              <span className={`font-bold text-sm ${log.browserStatus === 'FAILED' && log.serverStatus === 'FAILED' ? 'text-red-400' : 'text-accent-neon'}`}>
                {log.eventName}
              </span>
              <span className="text-gray-500 text-[9px]">{new Date(log.timestamp).toLocaleTimeString()}</span>
            </div>
            <div className="text-[9px] text-gray-400 mb-2 truncate">ID: {log.eventId}</div>
            <div className="text-gray-300 mt-1 whitespace-pre-wrap break-all bg-black/30 p-2 rounded">
              {JSON.stringify(log.params)}
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/10">
              <div>
                <span className="text-[9px] uppercase text-gray-500 block">Browser</span>
                <span className={`text-[10px] font-bold ${log.browserStatus === 'SUCCESS' ? 'text-accent-neon' : log.browserStatus === 'PENDING' ? 'text-yellow-400' : 'text-red-400'}`}>{log.browserStatus}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase text-gray-500 block">Server CAPI</span>
                <span className={`text-[10px] font-bold ${log.serverStatus === 'SUCCESS' ? 'text-accent-neon' : log.serverStatus === 'PENDING' ? 'text-yellow-400' : 'text-red-400'}`}>{log.serverStatus}</span>
              </div>
            </div>

            {log.browserError && (
              <div className="text-red-400 mt-2 text-[9px]">Browser Err: {log.browserError}</div>
            )}
            {log.serverResponse && log.serverStatus === 'FAILED' && (
              <div className="text-red-400 mt-2 text-[9px]">CAPI Err: {JSON.stringify(log.serverResponse)}</div>
            )}
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-gray-500 italic p-4 text-center bg-white/5 rounded-lg">No events recorded yet in this session. Click buttons or scroll to see them.</div>
        )}
      </div>
    </div>
  );
}
