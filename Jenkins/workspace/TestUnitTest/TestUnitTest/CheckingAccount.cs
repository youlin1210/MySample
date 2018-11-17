using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestUnitTest
{
    public class CheckingAccount
    {
        double m_balance;
        string m_name;
        public CheckingAccount(string name, double balance)
        {
            m_balance = balance;
            m_name = name;
        } 
        public void Withdraw(double amount)
        {
            if(m_balance >= amount)
            {
                m_balance -= amount;
            }
            else
            {
                throw new ArgumentException(amount.ToString(), "Withdrawal exceeds balance!");
            }
        }

        public double Balance { get; set; }
    }
}
