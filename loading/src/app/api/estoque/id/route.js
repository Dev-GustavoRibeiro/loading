import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const produto = await prisma.produto.findUnique({
      where: { id: Number(id) },
    });
    if (!produto) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }
    return NextResponse.json(produto, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return NextResponse.json({ error: "Erro interno ao buscar produto" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { nome, quantidade, preco, categoria } = body;

    // Validação simples
    if (!nome || !quantidade || !preco || !categoria) {
      return NextResponse.json(
        { error: "Faltam campos obrigatórios" },
        { status: 400 }
      );
    }

    const produtoAtualizado = await prisma.produto.update({
      where: { id: Number(id) },
      data: {
        nome,
        quantidade: Number(quantidade),
        preco: Number(preco),
        categoria,
      },
    });

    return NextResponse.json(produtoAtualizado, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return NextResponse.json({ error: "Erro interno ao atualizar produto" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await prisma.produto.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Produto excluído com sucesso" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    return NextResponse.json({ error: "Erro interno ao excluir produto" }, { status: 500 });
  }
}
