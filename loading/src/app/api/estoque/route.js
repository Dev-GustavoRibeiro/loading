import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 
// Ajuste o caminho para o arquivo onde você inicializa o Prisma (ex.: /lib/prisma)

export async function GET() {
  try {
    // Exemplo: busca todos os produtos da tabela "produto"
    const produtos = await prisma.produto.findMany();
    
    return NextResponse.json(produtos, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar estoque:", error);
    return NextResponse.json({ error: "Erro ao buscar estoque" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { nome, quantidade, preco, categoria } = body;

    // Validação simples
    if (!nome || !quantidade || !preco || !categoria) {
      return NextResponse.json(
        { error: "Faltam campos obrigatórios" },
        { status: 400 }
      );
    }

    // Cria novo produto no banco
    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        quantidade: Number(quantidade),
        preco: Number(preco),
        categoria,
      },
    });

    return NextResponse.json(novoProduto, { status: 201 });
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    return NextResponse.json({ error: "Erro interno ao adicionar produto" }, { status: 500 });
  }
}
