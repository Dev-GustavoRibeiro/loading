"use client";

import React, { useEffect, useState } from "react";

export default function EstoquePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Campo de pesquisa
  const [searchQuery, setSearchQuery] = useState("");
  
  // Novo produto com categoria
  const [newProduct, setNewProduct] = useState({
    nome: "",
    quantidade: "",
    preco: "",
    categoria: "",
  });
  
  // Produto em edição
  const [editingProduct, setEditingProduct] = useState(null);

  // Busca os produtos do estoque (GET /api/estoque)
  async function fetchEstoque() {
    try {
      const res = await fetch("/api/estoque");

      
      if (!res.ok) throw new Error("Erro ao buscar estoque");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEstoque();
  }, []);

  // Adiciona um novo produto (POST /api/estoque)
  async function handleAddProduct(e) {
    e.preventDefault();
    if (
      !newProduct.nome ||
      !newProduct.quantidade ||
      !newProduct.preco ||
      !newProduct.categoria
    ) {
      return;
    }
    try {
      const res = await fetch("/api/estoque", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) throw new Error("Erro ao adicionar produto");
      const addedProduct = await res.json();
      setProducts([...products, addedProduct]);
      setNewProduct({ nome: "", quantidade: "", preco: "", categoria: "" });
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  // Exclui um produto (DELETE /api/estoque/[id])
  async function handleDeleteProduct(id) {
    try {
      const res = await fetch(`/api/estoque/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir produto");
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  // Inicia a edição de um produto
  function handleEditProduct(product) {
    setEditingProduct(product);
  }

  // Salva o produto editado (PUT /api/estoque/[id])
  async function handleUpdateProduct(e) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/estoque/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      });
      if (!res.ok) throw new Error("Erro ao atualizar produto");
      const updatedProduct = await res.json();
      setProducts(
        products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      setEditingProduct(null);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  // Pesquisa por nome ou categoria
  const filteredProducts = products.filter((product) => {
    const search = searchQuery.toLowerCase();
    return (
      product.nome.toLowerCase().includes(search) ||
      product.categoria.toLowerCase().includes(search)
    );
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Carregando estoque...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h1
        className="text-6xl font-bold text-center text-white mb-8"
        style={{ WebkitTextStroke: "2px #1f2937" }}
      >
        Estoque
      </h1>

      {/* Formulário para Inserir Produto (com categoria) */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Inserir Produto</h2>
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Nome"
            className="border border-gray-300 rounded px-3 py-2"
            value={newProduct.nome}
            onChange={(e) => setNewProduct({ ...newProduct, nome: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Quantidade"
            className="border border-gray-300 rounded px-3 py-2"
            value={newProduct.quantidade}
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantidade: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Preço"
            className="border border-gray-300 rounded px-3 py-2"
            value={newProduct.preco}
            onChange={(e) => setNewProduct({ ...newProduct, preco: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Categoria"
            className="border border-gray-300 rounded px-3 py-2"
            value={newProduct.categoria}
            onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
            required
          />
          <button
            type="submit"
            className="md:col-span-4 bg-blue-600 text-white rounded px-4 py-2"
          >
            Adicionar Produto
          </button>
        </form>
      </div>

      {/* Campo de Pesquisa */}
      <div>
        <input
          type="text"
          placeholder="Pesquisar por nome ou categoria..."
          className="w-full border border-gray-300 rounded px-4 py-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="min-w-full text-gray-800">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Peça</th>
              <th className="px-4 py-2 text-left">Quantidade</th>
              <th className="px-4 py-2 text-left">Preço</th>
              <th className="px-4 py-2 text-left">Categoria</th>
              <th className="px-4 py-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-200">
                {/* Nome */}
                <td className="px-4 py-2">
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="text"
                      value={editingProduct.nome}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, nome: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    product.nome
                  )}
                </td>
                {/* Quantidade */}
                <td className="px-4 py-2">
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="number"
                      value={editingProduct.quantidade}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, quantidade: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    product.quantidade
                  )}
                </td>
                {/* Preço */}
                <td className="px-4 py-2">
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="number"
                      value={editingProduct.preco}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, preco: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    `R$ ${product.preco}`
                  )}
                </td>
                {/* Categoria */}
                <td className="px-4 py-2">
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="text"
                      value={editingProduct.categoria}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, categoria: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    product.categoria
                  )}
                </td>
                {/* Ações */}
                <td className="px-4 py-2 text-center">
                  {editingProduct && editingProduct.id === product.id ? (
                    <button
                      onClick={handleUpdateProduct}
                      className="bg-green-600 text-white rounded px-2 py-1 mr-2"
                    >
                      Salvar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="bg-yellow-500 text-white rounded px-2 py-1 mr-2"
                    >
                      Editar
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-600 text-white rounded px-2 py-1"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
