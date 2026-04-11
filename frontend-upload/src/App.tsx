import { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, FileText, Image as ImageIcon, Eye, HardDrive, Trash2 } from 'lucide-react';

// Se estiver testando LOCAL, use localhost. 
// Se estiver na AWS, mude para: 'http://3.144.72.128:3000/files'
const API_URL = 'http://3.22.172.99:3000/files';

export default function App() {
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    try {
      // Faz o GET em http://localhost:3000/files
      const response = await axios.get(API_URL);
      setFiles(response.data);
    } catch (error) {
      console.error("Erro ao buscar arquivos:", error);
    }
  };

  useEffect(() => { fetchFiles(); }, []);

  const handleUpload = async () => {
    if (!selectedFile) return alert("Selecione um arquivo primeiro!");
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // POST em http://localhost:3000/files/upload
      await axios.post(`${API_URL}/upload`, formData);
      setSelectedFile(null);
      await fetchFiles(); // Aguarda a atualização da lista
      alert("Arquivo enviado com sucesso!");
    } catch (error) {
      alert("Erro no upload.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    // 1. Verificação de segurança
    if (!id) return alert("ID do arquivo não encontrado!");
    if (!window.confirm("Tem certeza que deseja excluir este arquivo?")) return;

    try {
      // 2. CORREÇÃO DA ROTA: A rota de delete é http://localhost:3000/files/ID
      await axios.delete(`${API_URL}/${id}`);
      
      // 3. ATUALIZAÇÃO DA TELA: Removemos o arquivo do estado local IMEDIATAMENTE
      // Isso faz a interface ser muito mais rápida
      setFiles(prev => prev.filter(file => file.id !== id));
      
      alert("Arquivo removido com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro ao excluir o arquivo no servidor.");
      // Caso dê erro, recarregamos a lista real do banco para garantir
      fetchFiles();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans">
      <div className="max-w-3xl mx-auto">
        
        <header className="mb-10 flex items-center gap-3">
          <div className="bg-blue-600 p-3 rounded-lg text-white">
            <HardDrive size={30} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Meu Cloud Pessoal</h1>
            <p className="text-gray-500 text-sm">NestJS + React + PostgreSQL + AWS</p>
          </div>
        </header>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Novo Upload</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="file" 
              onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
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
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Arquivos Recentes</h2>
          <div className="grid gap-3">
            {files.length === 0 && (
              <p className="text-gray-400 text-center py-10 border-2 border-dashed rounded-xl">
                Nenhum arquivo encontrado.
              </p>
            )}
            
            {files.map((file) => (
              <div key={file.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {file.type?.includes('pdf') ? <FileText className="text-red-500" /> : <ImageIcon className="text-blue-500" />}
                  </div>
                  <div>
                    {/* Verifique se no seu banco é file.name ou file.originalName */}
                    <h3 className="font-medium text-gray-800 truncate w-40 md:w-64">{file.name || 'Arquivo sem nome'}</h3>
                    <p className="text-xs text-gray-400">
                      {(file.size / 1024).toFixed(2)} KB • {new Date(file.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a 
                    href={file.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Visualizar"
                  >
                    <Eye size={22} />
                  </a>
                  
                  <button 
                    onClick={() => handleDelete(file.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
