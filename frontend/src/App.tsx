import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Modal from './components/Modal';
import { ThemeProvider } from './context/ThemeContext';
import UserCount from './components/UserCount';
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshSignal, setRefreshSignal] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    console.log("refreshing user count");
    setRefreshSignal(prev => !prev);
  }
  
  const handleSubmitSuccess = () => {
    // Close the modal after successful submission
    setIsModalOpen(false);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Header />
        <main className="flex-grow">  
          <HeroSection onNotifyClick={handleOpenModal} refreshSignal={refreshSignal} />
        </main>
        <Footer />
        
        <Modal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          onSubmitSuccess={handleSubmitSuccess}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;