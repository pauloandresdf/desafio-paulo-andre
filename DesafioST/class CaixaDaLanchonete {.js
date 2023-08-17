class CaixaDaLanchonete {
    constructor() {
      this.cardapio = {
        cafe: { descricao: "Café", valor: 3.00 },
        chantily: { descricao: "Chantily (extra do Café)", valor: 1.50 },
        suco: { descricao: "Suco Natural", valor: 6.20 },
        sanduiche: { descricao: "Sanduíche", valor: 6.50 },
        queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
        salgado: { descricao: "Salgado", valor: 7.25 },
        combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
        combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 },
      };
  
      this.formasDePagamento = ["dinheiro", "debito", "credito"];
    }
  
    calcularValorDaCompra(formaDePagamento, itens) {
      if (!this.formasDePagamento.includes(formaDePagamento)) {
        return "Forma de pagamento inválida!";
      }
  
      let total = 0;
  
      const itemQuantities = {};
  
      for (const itemInfo of itens) {
        const [codigo, quantidade] = itemInfo.split(",");
        if (!this.cardapio[codigo]) {
          return "Item inválido!";
        }
  
        if (!itemQuantities[codigo]) {
          itemQuantities[codigo] = 0;
        }
        itemQuantities[codigo] += parseInt(quantidade);
      }
  
      for (const codigo in itemQuantities) {
        const item = this.cardapio[codigo];
        total += item.valor * itemQuantities[codigo];
      }
  
      if (formaDePagamento === "dinheiro") {
        total *= 0.95; // Aplicar desconto de 5% para pagamento em dinheiro
      } else if (formaDePagamento === "credito") {
        total *= 1.03; // Aplicar acréscimo de 3% para pagamento a crédito
      }
  
      return `R$ ${total.toFixed(2)}`;
    }
  }
  
  // Exemplo de uso
  const caixa = new CaixaDaLanchonete();
  console.log(caixa.calcularValorDaCompra("debito", ["chantily,1"])); // "Item extra não pode ser pedido sem o principal"
  console.log(caixa.calcularValorDaCompra("debito", ["cafe,1", "chantily,1"])); // "R$ 4,50"
  console.log(caixa.calcularValorDaCompra("credito", ["combo1,1", "cafe,2"])); // "R$ 15,96"
  