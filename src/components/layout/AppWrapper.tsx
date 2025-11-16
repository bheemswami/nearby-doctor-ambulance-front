import React from "react";
import Header from "../common/Header";

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Global Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t bg-white text-center text-sm text-gray-500">
        <p>
          Designed & developed by{" "}
          <span className="font-semibold text-emerald-600">
            Bheem Swami
          </span>
          {", "}focused on quality and innovation.
        </p>
      </footer>

    </div>
  );
};

export default AppWrapper;
