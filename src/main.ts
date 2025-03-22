import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1 class="title">CYBER TASK LIST</h1>
      
      <div class="input-group">
        <input
          type="text"
          [(ngModel)]="newTask"
          (keyup.enter)="addTask()"
          placeholder="Digite sua tarefa aqui..."
          class="cyber-input"
        />
        <button (click)="addTask()" class="cyber-button">Adicionar</button>
      </div>

      <div class="task-list">
        <h2 class="section-title">Tarefas em Andamento</h2>
        <div *ngIf="activeTasks.length === 0" class="empty-state">
          Nenhuma tarefa em andamento...
        </div>
        
        <div
          *ngFor="let task of activeTasks"
          class="task-item"
        >
          <div class="task-content">
            <div class="task-main">
              <label class="cyber-checkbox-label">
                <input
                  type="checkbox"
                  class="cyber-checkbox"
                  [(ngModel)]="task.completed"
                />
                <span class="task-text">{{ task.text }}</span>
              </label>
            </div>
            <button
              (click)="deleteTask(task)"
              class="cyber-button delete-btn"
              aria-label="Deletar tarefa"
            >
              ✖
            </button>
          </div>
          <div class="task-meta">
            <span class="task-date">{{ formatDate(task.createdAt) }}</span>
          </div>
        </div>

        <h2 class="section-title completed-section">Tarefas Concluídas</h2>
        <div *ngIf="completedTasks.length === 0" class="empty-state">
          Nenhuma tarefa concluída...
        </div>
        
        <div
          *ngFor="let task of completedTasks"
          class="task-item completed"
        >
          <div class="task-content">
            <div class="task-main">
              <label class="cyber-checkbox-label">
                <input
                  type="checkbox"
                  class="cyber-checkbox"
                  [(ngModel)]="task.completed"
                />
                <span class="task-text">{{ task.text }}</span>
              </label>
            </div>
            <button
              (click)="deleteTask(task)"
              class="cyber-button delete-btn"
              aria-label="Deletar tarefa"
            >
              ✖
            </button>
          </div>
          <div class="task-meta">
            <span class="task-date">{{ formatDate(task.createdAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class App {
  tasks: Task[] = [];
  newTask = '';

  get activeTasks() {
    return this.tasks.filter(task => !task.completed);
  }

  get completedTasks() {
    return this.tasks.filter(task => task.completed);
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({
        id: Date.now(),
        text: this.newTask,
        completed: false,
        createdAt: new Date()
      });
      this.newTask = '';
    }
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
}

bootstrapApplication(App);