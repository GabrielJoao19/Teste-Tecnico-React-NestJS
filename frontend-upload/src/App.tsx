import { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, FileText, Image as ImageIcon, Eye, HardDrive } from 'lucide-react';

// URL do seu Backend (Garçom)
const API_URL = 'http://localhost:3000/files';

export default function App() {
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // 1. BUSCAR ARQUIVOS (GET) - Igual ao que você fez no navegador
  const fetchFiles = async () => {
    try {
      const response = await axios.get(API_URL);
      setFiles(response.data);
    } catch (error) {
      console.error("Erro ao buscar arquivos:", error);
    }
  };

  // Carrega a lista assim que a página abre
  useEffect(() => { fetchFiles(); }, []);

  // 2. ENVIAR ARQUIVO (POST) - Igual ao que você fez no Postman
  const handleUpload = async () => {
    if (!selectedFile) return alert("Selecione um arquivo primeiro!");

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile); // 'file' deve ser igual ao nome no NestJS

    try {
      await axios.post(`${API_URL}/upload`, formData);
      setSelectedFile(null);
      fetchFiles(); // Atualiza a lista após o upload
      alert("Arquivo enviado com sucesso!");
    } catch (error) {
      alert("Erro no upload. Verifique se o Backend está ligado na porta 3000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Cabeçalho */}
        <header className="mb-10 flex items-center gap-3">
          <div className="bg-blue-600 p-3 rounded-lg text-white">
            <HardDrive size={30} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Meu Cloud Pessoal</h1>
            <p className="text-gray-500 text-sm">NestJS + React + PostgreSQL</p>
          </div>
        </header>

        {/* Área de Upload */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Novo Upload</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="file" 
              onChange={(e) => setSelectedFile(e.target.files![0])}
              className="flex-1 border-2 border-dashed border-gray-200 p-4 rounded-xl hover:border-blue-400 transition-colors cursor-pointer"
            />
            <button 
              onClick={handleUpload}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2 disabled:bg-gray-400"
            >
              {loading ? "Enviando..." : <><Upload size={20}/> Enviar</>}
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-400 italic">Formatos aceitos: PDF, JPG, PNG.</p>
        </section>

        {/* Tabela de Arquivos */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Arquivos Recentes</h2>
          <div className="grid gap-3">
            {files.length === 0 && <p className="text-gray-400 text-center py-10 border-2 border-dashed rounded-xl">Nenhum arquivo encontrado.</p>}
            
            {files.map((file) => (
              <div key={file.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {file.type.includes('pdf') ? <FileText className="text-red-500" /> : <ImageIcon className="text-blue-500" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 truncate w-48 md:w-80">{file.name}</h3>
                    <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(2)} KB • {new Date(file.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <a 
                  href={file.url} 
                  target="_blank" 
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Visualizar"
                >
                  <Eye size={22} />
                </a>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}